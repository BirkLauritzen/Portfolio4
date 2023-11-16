fetch("ufo.json")
    .then(response => response.json())
    .then(data => {
        createChart(data);
    })
    .catch(error => {
        console.error("Error fetching the JSON data: ", error);
    });

function createChart(ufoSightings) {

    const sightingsPerYear = ufoSightings.reduce((acc, sighting) => {
        const year = new Date(sighting.datetime).getFullYear();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
    }, {});


    const sortedYears = Object.keys(sightingsPerYear).sort((a, b) => a - b);
    const sightingsCount = sortedYears.map(year => sightingsPerYear[year]);


    const ctx = document.querySelector("#chart").getContext("2d");


    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: sortedYears,
            datasets: [{
                label: "Number of UFO Sightings per Year",
                data: sightingsCount,
                backgroundColor: "rgba(0, 128, 0, 1)",
                borderColor: "rgba(0, 128, 0, 1)",
                borderWidth: 5
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Year"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Number of Sightings"
                    },
                }
            }
        }
    });
}
