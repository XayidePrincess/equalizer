import * as toxicity from "@tensorflow-models/toxicity";
import Chart from "chart.js/auto";

const threshold = 0.4;

const form = document.getElementById("textofmain");
const results = document.getElementById("results");
const story = document.getElementById("story");
const spinner = document.getElementById("spinner");
const toggler = document.getElementById("toggler");

/////////

toxicity.load(threshold).then((model) => {
    spinner.style.display = "none";
    toggler.style.display = "block";
    ////////
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        results.innerHTML = "";

        ////////////
        model.classify(story.value).then((predictions) => {
            //aqui vamos a insertar el radar
            const getLabels = (dataItem) => dataItem.label;
            const labels = predictions.map(getLabels);

            const getResultData = (set) => (dataItem) =>
                dataItem.results[0].probabilities[set];

            const toxicData = predictions.map(getResultData(1)).map((x) => x * 2);
            const deiData = predictions.map(getResultData(0));

            const data = {
                labels: labels,
                datasets: [
                    {
                        label: "Toxic",
                        data: toxicData,
                        borderColor: "rgba(255,0,0,1)",
                        backgroundColor: "rgba(255,0,0,0.5)"
                    },
                    {
                        label: "Not Toxic",
                        data: deiData,
                        borderColor: "rgba(0,255,0,1)",
                        backgroundColor: "rgba(0,255,0,0.5)"
                    }
                ]
            };
            const config = {
                type: "radar",
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "DEI RESULTS"
                        }
                    }
                }
            };
            const canvas = document.createElement("canvas");
            ////////
            results.append(canvas);
            const myChart = new Chart(canvas, config);
            console.log("working");
            //myChart.destroy();
        });
    });
});
//-=const myChart = new Chart(ctx, {"d"});
