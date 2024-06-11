document.getElementById('derivative-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputFunction = document.getElementById('function').value;
    calculateDerivative(inputFunction);
});

document.querySelectorAll('.key').forEach(function(button) {
    button.addEventListener('click', function() {
        const input = document.getElementById('function');
        const text = button.textContent;
        if (button.id === 'delete') {
            input.value = input.value.slice(0, -1);
        } else if (button.id === 'clear') {
            input.value = '';
        } else if (text.includes('()')) {
            input.value += text.replace('()', '(') + ')';
        } else {
            input.value += text;
        }
    });
});

function calculateDerivative(func) {
    // Reemplazamos los asteriscos por paréntesis
    func = func.replace(/\*/g, '()');

    // Incluimos la biblioteca math.js desde el CDN
    const math = window.math;
    
    try {
        const node = math.parse(func);
        const derivative = math.derivative(node, 'x');
        const simplified = math.simplify(derivative);
        const result = simplified.toString();
        
        // Generamos el procedimiento paso a paso
        const steps = generateSteps(node, derivative, simplified);
        
        document.getElementById('result').textContent = result;
        document.getElementById('procedure').textContent = steps;
    } catch (error) {
        document.getElementById('result').textContent = 'Error al calcular la derivada. Por favor, revisa la función ingresada.';
        document.getElementById('procedure').textContent = '';
    }
}

function generateSteps(node, derivative, simplified) {
    let steps = `Función original: ${node.toString()}\n\n`;

    steps += `1. Derivamos cada término:\n`;

    const terms = node.args || [node];
    terms.forEach(term => {
        const termDerivative = math.derivative(term, 'x').toString();
        steps += `   - Derivada de ${term.toString()} es ${termDerivative}\n`;
    });

    steps += `\n2. Sumamos las derivadas individuales para obtener la derivada de la función completa:\n`;
    steps += `   ${derivative.toString()}\n`;

    steps += `\n3. Simplificamos la derivada obtenida:\n`;
    steps += `   ${simplified.toString()}\n`;

    return steps;
}
