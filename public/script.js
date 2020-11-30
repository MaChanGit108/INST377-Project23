//the API fetch link in server.js already filters for agency=EDUCATION

function convertBudgetToAmount(budget) {

    console.log("1");
    const amountList = budget.reduce((list, invoice) => {
        console.log("2");
        const descriptionInList = list.find((c) => c.label === invoice.payment_description);

        if (!descriptionInList) {
            list.push({
                label: invoice.payment_description,
                y: invoice.amount
            });
        }
        else {
            descriptionInList.y += invoice.amount;
        }
        return list;
    }, []).sort((b, a) => (a.label > b.label) ? 1 : -1);

    console.log("3");
    console.log(amountList)
    return amountList;
}

function makeYourOptionsObject(budget) {
    // set your chart configuration here!
    CanvasJS.addColorSet('customColorSet1', [
        // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
        "#5531E8",
        "#3340F2",
        "#386FDB",
        "#33A5F2",
        "#31CEE8"
    ]);

    return {
        animationEnabled: true,
        colorSet: 'customColorSet1',
        title: {
            text: 'PGC Education Budget 2020'
        },
        axisX: {
            interval: 1,
            labelFontSize: 12
        },
        axisY2: {
            interlacedColor: 'rgba(1,77,101,.2)',
            gridColor: 'rgba(1,77,101,.1)',
            title: 'Restaurants By Category',
            labelFontSize: 12,
            /*scaleBreaks: {type: "wavy",
                          customBreaks: [{startValue: 40,
                                          endValue: 50,
                                          color: "orange"
                                         },
                                         {startValue: 85,
                                          endValue: 100,
                                          color: "orange"
                                         },
                                         {startValue: 140,
                                          endValue: 175,
                                          color: "orange"
                                         }
                         ]} // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/ */
        },
        data: [{
            type: 'bar',
            name: 'budget',
            axisYType: 'secondary',
            dataPoints: budget
        }]
    };
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
        const reorganizedData = convertBudgetToAmount(budget);
        const options = makeYourOptionsObject(reorganizedData);
        //const chart = new CanvasJS.Chart('chartContainer', options);
        //chart.render();
    } catch(err) {console.log(err)};
}

window.onload = mainThread;