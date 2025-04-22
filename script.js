let modelo = null;

// Cargar el modelo al inicio
toxicity.load(0.5).then(m => {
    modelo = m;
    console.log("Modelo cargado");
});

function analizarToxicidad() {
    const texto = document.getElementById("texto").value;
    const resultadoDiv = document.getElementById("resultado");

    if (!modelo) {
        resultadoDiv.innerText = "El modelo aún se está cargando...";
        return;
    }

    modelo.classify([texto]).then(predicciones => {
        let salida = '<h3>Resultados de toxicidad:</h3><ul style="list-style:none;">';

        predicciones.forEach(pred => {
            const match = pred.results[0].match;
            const prob = (pred.results[0].probabilities[1] * 100).toFixed(2);

            salida += `<li class="${match ? 'toxico' : 'no-toxico'}">
        ${match ? '⚠️' : '✅'} <strong>${pred.label}</strong>: ${prob}% de toxicidad
        </li>`;
        });

        salida += '</ul>';
        resultadoDiv.innerHTML = salida;
    });
}
