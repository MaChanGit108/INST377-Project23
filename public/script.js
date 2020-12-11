//the API fetch link in server.js already filters for agency=EDUCATION

function convertBudgetToAmount(budget) {
   
    console.log("1");
    const amountList = budget.reduce((list, invoice) => {
        console.log("2");
        const descriptionInList = list.find((c) => c.label === invoice.payment_description);

        if (!descriptionInList) {
            list.push({
                label: invoice.payment_description,
                y: Number(Number(invoice.amount).toFixed(2))
            });
        }
        else {
            descriptionInList.y = Number((Number(descriptionInList.y) + Number(invoice.amount)).toFixed(2));
        }
        return list;
    }, []).sort((b, a) => (a.y < b.y) ? 1 : -1);

    console.log("3");
    console.log(amountList)
    return amountList;
}

function filterBudgetByPayee(budget, payee) {
    const list = [];
    budget.forEach((invoice) => {
        if (invoice.payee_name === payee) {list.push(invoice);}
    });
    return list;
}

function getBudgetTotal(budget) {
    let total = 0;
    budget.forEach((invoice) => total += Number(invoice.amount));
    return total;
}

function makeYourOptionsObject(data, type) {
    // set your chart configuration here!
    CanvasJS.addColorSet('customColorSet1', [
        // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
        "#5531E8",
        "#3340F2",
        "#386FDB",
        "#33A5F2",
        "#31CEE8"
    ]);

    console.log(data);

    if (type === 'total') {
        return {
            animationEnabled: true,
            colorSet: 'customColorSet1',
            title: {
                text: 'Total Budget by Category'
            },
            axisX: {
                interval: 1,
                labelFontSize: 12
            },
            axisY2: {
                interlacedColor: 'rgba(1,77,101,.2)',
                gridColor: 'rgba(1,77,101,.1)',
                //title: 'Total Budget by Category',
                labelFontSize: 12,
                scaleBreaks: {type: "wavy",
                            customBreaks: [{startValue: 80000000,
                                            endValue: 780000000,
                                            color: "orange"
                                            },
                                            {startValue: 25000000,
                                            endValue: 40000000,
                                            color: "orange"
                                            },
                                            {startValue: 1000000,
                                            endValue: 15000000,
                                            color: "orange"
                                            }
                            ]} // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
            },
            data: [{
                type: 'bar',
                name: 'budget',
                axisYType: 'secondary',
                dataPoints: data
            }]
        };
    }

    else if (type === 'payee') {
        return {
            exportEnabled: true,
	        animationEnabled: true,
            /*title:{
                text: "State Operating Funds"
            },*/
            legend:{
                cursor: "pointer"
            },
            data: [{
                type: "pie",
                showInLegend: true,
                legendText: "{label}",
                toolTipContent: "{label}: <strong>${y}</strong>",
                indexLabel: "{label} - ${y}",
                dataPoints: data
            }]
        }
    }
}
async function mainThread() {
    try {
        const data = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const budget = await data.json();
        //console.log(budget);
        const reorganizedData = convertBudgetToAmount(budget);
        const options = makeYourOptionsObject(reorganizedData, 'total');
        const chart = new CanvasJS.Chart('chartContainer', options);
        chart.render();

        const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
        
        const budget_total = getBudgetTotal(budget);
        const budgetElement = document.createElement('p');
        budgetElement.className = 'budget-total';
        budgetElement.innerHTML = 'Total Prince George\'s County Budget: <strong>' + formatter.format(budget_total) + '</strong>';
        document.querySelector('.article').append(budgetElement);

        const payees_list = new Set();
        for (let i = 0; i < budget.length; i++) {
            payees_list.add(budget[i].payee_name);
        }
        payees_list.forEach((payee) =>{
            const listElement = document.createElement('li');
            listElement.className = 'payee';
            listElement.id = payee;
            listElement.innerText = payee;
            $('.payee-list ul').append(listElement);
        });

        const payees = document.querySelectorAll('.payee');
        payees.forEach(p => p.addEventListener('click', () => outputPayeeInfo(budget, p, budget_total, formatter)));

    } catch(err) {console.log(err)};
}

function outputPayeeInfo(budget, p, budget_total, formatter) {
    const payee_name = p.id;
    const display = document.querySelector('.payee-display');
    
    display.innerHTML = '';
    const payee_budget = filterBudgetByPayee(budget, payee_name);
    const payee_total = getBudgetTotal(payee_budget);
    const options = makeYourOptionsObject(convertBudgetToAmount(payee_budget), 'payee');
    
    const headerElement = document.createElement('h2');
    headerElement.innerText = p.innerText;

    const divElement = document.createElement('div');
    divElement.className = 'target';
    divElement.id = 'payeeChartContainer';

    const totalElement = document.createElement('p');
    totalElement.innerHTML = 'Total: <strong>' + formatter.format(payee_total) + '</strong>';

    const percentElement = document.createElement('p');
    percentElement.innerHTML = '% of Budget: <strong>' + (payee_total/budget_total*100).toFixed(5) + '%</strong>';

    display.prepend(headerElement);
    display.append(divElement);
    display.append(totalElement);
    display.append(percentElement);

    const chart = new CanvasJS.Chart('payeeChartContainer', options);
    chart.render();
}

window.onload = mainThread;