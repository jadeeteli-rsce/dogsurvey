import { useState } from "react";

export default function TestPerroIdeal() {
  const [step, setStep] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);

  const preguntas = [
    {
      key: "vivienda",
      titulo: "¿Dónde vives?",
      opciones: ["piso", "casa"]
    },
    {
      key: "actividad",
      titulo: "Nivel de actividad",
      opciones: ["bajo", "medio", "alto"]
    },
    {
      key: "ninos",
      titulo: "¿Hay niños en casa?",
      opciones: ["si", "no"]
    }
  ];

  const manejarRespuesta = (valor) => {
    const nueva = { ...respuestas, [preguntas[step].key]: valor };
    setRespuestas(nueva);

    if (step + 1 < preguntas.length) {
      setStep(step + 1);
    } else {
      calcularResultado(nueva);
    }
  };

  const calcularResultado = (r) => {
    let puntuacion = {
      "Labrador Retriever": 0,
      "Bulldog Francés": 0,
      "Border Collie": 0
    };

    if (r.vivienda === "piso") {
      puntuacion["Bulldog Francés"] += 2;
    } else {
      puntuacion["Labrador Retriever"] += 1;
      puntuacion["Border Collie"] += 2;
    }

    if (r.actividad === "alto") {
      puntuacion["Border Collie"] += 3;
    } else if (r.actividad === "medio") {
      puntuacion["Labrador Retriever"] += 2;
    } else {
      puntuacion["Bulldog Francés"] += 2;
    }

    if (r.ninos === "si") {
      puntuacion["Labrador Retriever"] += 3;
    }

    const mejor = Object.keys(puntuacion).reduce((a, b) =>
      puntuacion[a] > puntuacion[b] ? a : b
    );

    setResultado(mejor);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🐶 Test: Tu perro ideal</h1>

      {!resultado ? (
        <>
          <p>{preguntas[step].titulo}</p>
          {preguntas[step].opciones.map((op) => (
            <button
              key={op}
              onClick={() => manejarRespuesta(op)}
              style={{
                margin: "10px",
                padding: "10px",
                cursor: "pointer"
              }}
            >
              {op}
            </button>
          ))}
        </>
      ) : (
        <>
          <h2>✅ Tu perro ideal es: {resultado}</h2>
          <button onClick={() => location.reload()}>
            Repetir
          </button>
        </>
      )}
    </div>
  );
}