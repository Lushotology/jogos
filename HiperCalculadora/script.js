function fatorial(x) {
  if (x === 0 || x === 1) return 1;
  let res = 1;
  for (let i = 2; i <= x; i++) res *= i;
  return res;
}

function combinacao(n, r) {
  if (r < 0 || r > n) return 0; // só assim pra evitar erros
  return fatorial(n) / (fatorial(r) * fatorial(n - r));
}

function probHiper(N, n, K, k) {
  return (combinacao(K, k) * combinacao(N - K, n - k)) / combinacao(N, n);
}

function calcular() {
  const N = parseInt(document.getElementById("N").value);
  const n = parseInt(document.getElementById("n").value);
  const K = parseInt(document.getElementById("K").value);
  const k = parseInt(document.getElementById("k").value);

  if (isNaN(N) || isNaN(n) || isNaN(K) || isNaN(k)) {
    document.getElementById("resultado").innerText = "Erro, preencha todos os campos.";
    return;
  }

  // Proba exata P(X = k)
  const prob = probHiper(N, n, K, k);
  const probPercent = (prob * 100).toFixed(2);

  // Proba acumulada P(X <= k)
  let probAcumulada = 0;
  for (let i = 0; i <= k; i++) {
    probAcumulada += probHiper(N, n, K, i);
  }
  const probAcumuladaPercent = (probAcumulada * 100).toFixed(2);

  // Proba complementar P(X >= k)
  let probComplementar = 0;
  for (let i = k; i <= n; i++) {
    probComplementar += probHiper(N, n, K, i);
  }
  const probComplementarPercent = (probComplementar * 100).toFixed(2);

  // Proba de comprar 0 cartas desejadas
  const probZero = probHiper(N, n, K, 0);
  const probZeroPercent = (probZero * 100).toFixed(2);

  document.getElementById("resultado").innerHTML =
    "<i>Probabilidade de comprar " + k + " ou mais cartas  = " + probComplementarPercent + "%</i><br>" + //(X ≥ " + k + ")
    "Probabilidade de comprar " + k + " ou menos cartas  = " + probAcumuladaPercent + "%<br>" + // (X ≤ " + k + ")
    "Probabilidade de comprar exatamente " + k + " cartas  = " + probPercent + "%<br>" + // (X = " + k + ")
    "Probabilidade de não comprar nenhuma carta desejada  = " + probZeroPercent + "%<br>"; // (X = 0)
}