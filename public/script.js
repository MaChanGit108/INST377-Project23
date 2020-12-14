//the API fetch link in server.js already filters for agency=EDUCATION

// This function takes a budget and returns a list of objects representing each category and the total budget allocated to each
function convertBudgetToAmount(budget) {
    const amountList = budget.reduce((list, invoice) => {
        
        const descriptionInList = list.find((c) => c.label === invoice.payment_description);

        if (!descriptionInList) {   // on first instance of category, creates data object
            list.push({
                label: invoice.payment_description,
                y: Number(Number(invoice.amount).toFixed(2))
            });
        }
        else {  // on any successive instances, increments the total amount of that category
            descriptionInList.y = Number((Number(descriptionInList.y) + Number(invoice.amount)).toFixed(2));
        }
        return list;
    }, []).sort((b, a) => (a.y < b.y) ? 1 : -1);    // sorts by amount of money in descending order

    return amountList;
}

// This function iterates the budget and sums the total amount of money
function getBudgetTotal(budget) {
    let total = 0;
    budget.forEach((invoice) => total += Number(invoice.amount));
    return total;
}

// This function returns the options object to prepare a bar chart for overall budget, or a pie chart for payee budget
function makeYourOptionsObject(data, type) {

    CanvasJS.addColorSet('customColorSet1', [
        "#5531E8",
        "#3340F2",
        "#386FDB",
        "#33A5F2",
        "#31CEE8"
    ]);

    if (type === 'total') { // bar chart settings for total budget
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
                            ]}
            },
            data: [{
                type: 'bar',
                name: 'budget',
                axisYType: 'secondary',
                dataPoints: data
            }]
        };
    }

    else if (type === 'payee') {    // pie chart settings for specific payee budget
        return {
            exportEnabled: true,
	        animationEnabled: true,
            legend:{
                cursor: "pointer",
                itemclick: explodePie
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
// This function from the CanvasJS documentation pops out sections of the pie chart when the legend is clicked
function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();
}

// This function is called when a payee from the list is selected. Creates and displays pie chart and other calculated information
async function outputPayeeInfo(p, budget_total, formatter) {
    try {
        const payee_name = p.id;
        const display = document.querySelector('.payee-display');
        const curr = display.querySelector('#selected').innerText;

        if (curr !== p.innerText) { // nothing happens if user selects same payee

            const send = {payee_name};
            const fetch_options = {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(send)
            }
            
            if (curr === 'Select a Payee') {    // upon first payee selection
                // Creates and appends empty containers for payee chart and info
                const divElement = document.createElement('div');
                divElement.className = 'target';
                divElement.id = 'payeeChartContainer';
                display.append(divElement);

                const totalElement = document.createElement('p');
                totalElement.id = 'total-budget';
                display.append(totalElement);

                const percentElement = document.createElement('p');
                percentElement.id = 'percent-budget';
                display.append(percentElement);

                fetch_options.method = 'POST';

            } else {    // for successive payee selections
                fetch_options.method = 'PUT';
            }

            const data = await fetch('/api', fetch_options);   // returns a new list filtering the total budget for the specified payee
            const payee_budget = await data.json()    
        
            const payee_total = getBudgetTotal(payee_budget);
            const options = makeYourOptionsObject(convertBudgetToAmount(payee_budget), 'payee');
            
            display.querySelector('#selected').innerText = p.innerText;
            display.querySelector('#total-budget').innerHTML = 'Total: <strong>' + formatter.format(payee_total) + '</strong>';
            display.querySelector('#percent-budget').innerHTML = '% of Total Budget: <strong>' + (payee_total/budget_total*100).toFixed(5) + '%</strong>';

            const chart = new CanvasJS.Chart('payeeChartContainer', options);
            chart.render();
        }
    } catch(err) {console.log(err)};
}

async function mainThread() {
    try {
        const data = await fetch('/api', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //  Retrieves budget from server and creates initial chart
        const budget = await data.json();
        const reorganizedData = convertBudgetToAmount(budget);
        const options = makeYourOptionsObject(reorganizedData, 'total');
        const chart = new CanvasJS.Chart('chartContainer', options);
        chart.render();

        const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}); // creates number formatter for US currency
        
        // Displays total budget
        const budget_total = getBudgetTotal(budget);
        const budgetElement = document.createElement('p');
        budgetElement.className = 'budget-total';
        budgetElement.innerHTML = 'Total Prince George\'s County Budget: <strong>' + formatter.format(budget_total) + '</strong>';
        document.querySelector('.article').append(budgetElement);

        //  Creates list of all unique payees and adds list elements to page
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
        payees.forEach(p => p.addEventListener('click', () => outputPayeeInfo(p, budget_total, formatter)));    // event listener for payee mouse selection

    } catch(err) {console.log(err)};
}

window.onload = mainThread;