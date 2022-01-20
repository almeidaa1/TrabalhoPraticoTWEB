window.onload = function() 
{
    init();
};

function init() 
{
    hideMenu();
    resetPanel_CalculaPreco();
    resetPanel_CalculaFinanciamento();
    mostrarIdade();
}


function showSearch() 
{
    let str = document.getElementById('search').value;
    alert(str);
}

document.getElementById('search_button').addEventListener('click', showSearch);

let ul = document.getElementById('selecao_ul');
ul.addEventListener('click', function(event) 
{
    let target = event.target;

    if (target === document.getElementById('selecao_ul'))
        return;

    let li = document.querySelectorAll('#selecao_ul li');

    for (let i = 0; i < li.length; i++) 
    {
        if (li[i] === target) 
        {
            li[i].setAttribute('style', 'color: black; border-bottom:1.5px solid black;');
            if (!li[i].classList.contains('selected'))
                li[i].classList.add('selected');
        }
        else if (li[i].classList.contains('selected')) 
        {
            li[i].classList.remove('selected');
            li[i].setAttribute('style', 'color: #97979a; border-bottom: none;');
        }
    }
});

// MENU //

let imgMenu = document.getElementById('menu');
let navbar = document.querySelector('.navbar');

imgMenu.addEventListener('click', menu);

function menu()
{
    if (navbar.classList.contains('show')) 
    {
        hideMenu();
        return;
    }
    navbar.setAttribute('style', 'display: flex', 'flex-direction: column');
    navbar.classList.add('show');
}

function hideMenu()
{
    navbar.setAttribute('style', 'display: none');
    navbar.classList.remove('show');
}

// Preço Imovel V //

let container_resultado = document.querySelector('#container_resultado');
let container_resultadoFinanciamento = document.querySelector('#container_resultadoFinanciamento');
let container_financiamento = document.querySelector('#container_financiamento');
let divsPreco = document.querySelectorAll('#container_resultado div'); // Array de divs
let divsFinanciamento = document.querySelectorAll('#container_resultadoFinanciamento div'); // Array de divs
let texto = document.querySelectorAll('#container_resultado div *');

let c1, c2 = 0.95, c3 = 0.9;
let zona1 = 1200, zona2 = 2000, zona3 = 2500;
let precoZona1, precoZona2, precoZona3;

let garagemN = document.querySelector('#garagemN');
let garagemS = document.querySelector('#garagemS');

let proximidadeN = document.querySelector('#proximidadeN');
let proximidadeS = document.querySelector('#proximidadeS');

let area = document.querySelector('#area');
let idade = document.querySelector('#idade');

let taxaBase = 0.005;
let spread1, spread2, spread3;
let taxaJurosGlobal1, taxaJurosGlobal2, taxaJurosGlobal3;
let prestacaoMensal1, prestacaoMensal2, prestacaoMensal3;
let valorEmprestimo1, valorEmprestimo2, valorEmprestimo3;

let preçoTotal = document.querySelector('#preçoTotal');
let valorEmprestimo = document.querySelector('#valorEmprestimo');
let prazoPagamento = document.querySelector('#prazoPagamento');
let valorEntrada1 = 0.2, valorEntrada2 = 0.6, valorEntrada3 = 0.3;

let formPreco = document.querySelector('#formPreco');
let formFinanciamento = document.querySelector('#formFinanciamento');
let calcular = document.querySelector('#btnFinanciamento2');


window.onload = function () 
{
    init();
};

function init() 
{
    resetPanel_CalculaPreco();
    resetPanel_CalculaFinanciamento();
    mostrarIdade();
}

// Evento para que o submit não submeta qualquer dados
formPreco.addEventListener('submit', function (event) 
{
    event.preventDefault();
});

formFinanciamento.addEventListener('submit', function (event) 
{
    event.preventDefault();
});

function mostrarIdade() 
{
    document.getElementById('textInput').innerHTML = idade.value;
    calculaC1();
}

function calculaC1()
{
    if(0 < idade.value && idade.value <= 5)
        c1 = 1;
    if (5 < idade.value && idade.value <= 10)
        c1 = 0.95;
    if (10 < idade.value)
        c1 = 0.9;
}

garagemN.addEventListener('click', function() 
{
    c2 = 0.95;
});

garagemS.addEventListener('click', function () {
    c2 = 1;
});

proximidadeN.addEventListener('click', function () {
    c3 = 0.9;
});

proximidadeS.addEventListener('click', function () {
    c3 = 1;
});

document.querySelector('#btnCalcularPreco').addEventListener('click', PrecoImovel);

function PrecoImovel()
{
    calculaPreco(area.value);

    container_resultado.setAttribute('style', 'display: flex');

    resetPanel_CalculaFinanciamento();
    
    for (let i = 0; i < divsPreco.length; i++)
    {
        divsPreco[i].setAttribute('style', 'display: inline');
        divsPreco[i].classList.add('showCalculaPreco');
    }

    showCalculaPreco();

    divsPreco[0].addEventListener('mouseover', function() {
        divsPreco[0].innerHTML = "ZONA 1<br><br>" + "€/m²: " + zona1 + "<br>Área: " + area.value + "<br>Coeficientes de desvalorização:<br>  Idade: " + c1 + "<br>  Garagem: " + c2 + "<br>  Proximidade a Transportes Públicos: " + c3 + "<br><br>Preço: " + precoZona1 + "€";
    });
    divsPreco[1].addEventListener('mouseover', function () {
        divsPreco[1].innerHTML = "ZONA 2<br><br>" + "€/m²: " + zona2 + "<br>Área: " + area.value + "<br>Coeficientes de desvalorização:<br>  Idade: " + c1 + "<br>  Garagem: " + c2 + "<br>  Proximidade a Transportes Públicos: " + c3 + "<br><br>Preço: " + precoZona2 + "€";
    });
    divsPreco[2].addEventListener('mouseover', function () {
        divsPreco[2].innerHTML = "ZONA 3<br><br>" + "€/m²: " + zona3 + "<br>Área: " + area.value + "<br>Coeficientes de desvalorização:<br>  Idade: " + c1 + "<br>  Garagem: " + c2 + "<br>  Proximidade a Transportes Públicos: " + c3 + "<br><br>Preço: " + precoZona3 + "€";
    });

    divsPreco[0].addEventListener('mouseout', function () {
        divsPreco[0].innerHTML = "ZONA 1<br><br>Preço: " + precoZona1 + "€";
    });
    divsPreco[1].addEventListener('mouseout', function () {
        divsPreco[1].innerHTML = "ZONA 2<br><br>Preço: " + precoZona2 + "€";
    });
    divsPreco[2].addEventListener('mouseout', function () {
        divsPreco[2].innerHTML = "ZONA 3<br><br>Preço: " + precoZona3 + "€";
    });

}

function calculaPreco(valorArea) 
{
    precoZona1 = valorArea * zona1 * c1 * c2 * c3;
    precoZona2 = valorArea * zona2 * c1 * c2 * c3;
    precoZona3 = valorArea * zona3 * c1 * c2 * c3;
}

function showCalculaPreco()
{
    divsPreco[0].setAttribute('style', 'border-right: 2px solid black');
    divsPreco[1].setAttribute('style', 'border-right: 2px solid black');
    divsPreco[0].innerHTML = "ZONA 1<br><br>Preço: " + precoZona1 + "€";
    divsPreco[1].innerHTML = "ZONA 2<br><br>Preço: " + precoZona2 + "€";
    divsPreco[2].innerHTML = "ZONA 3<br><br>Preço: " + precoZona3 + "€";
}

function resetPanel_CalculaPreco()
{
    container_resultado.setAttribute('style', 'display: none');
    for(let i = 0; i < divsPreco.length; i++)
    {
        if (divsPreco[i].classList.contains('showCalculaPreco'))
            divsPreco[i].classList.remove('showCalculaPreco');
    }
}

document.querySelector('#btnFinanciamento').addEventListener('click', Financiamento);

function Financiamento()
{
    if(container_financiamento.classList.contains('show'))
    {
        resetPanel_CalculaFinanciamento();
        return;
    }
    container_financiamento.classList.add('show');
    container_financiamento.setAttribute('style', 'display: flex');

    for (let i = 0; i < divsFinanciamento.length; i++) 
    {
        divsFinanciamento[i].setAttribute('style', 'display: inline');
        divsFinanciamento[i].classList.add('showCalculaFinanciamento');
    }

    calcular.addEventListener('click', showFinanciamento);
}

function calculaFinanciamento(montanteTotal) 
{
    calculaSpread();

    taxaJurosGlobal1 = (taxaBase + spread1);
    taxaJurosGlobal2 = (taxaBase + spread2);
    taxaJurosGlobal3 = (taxaBase + spread3);

    valorEmprestimo1 = montanteTotal - (montanteTotal * valorEntrada1);
    valorEmprestimo2 = montanteTotal - (montanteTotal * valorEntrada2);
    valorEmprestimo3 = montanteTotal - (montanteTotal * valorEntrada3);

    prestacaoMensal1 = Math.round(valorEmprestimo1 / prazoPagamento.value);
    prestacaoMensal2 = Math.round(valorEmprestimo1 / prazoPagamento.value);
    prestacaoMensal3 = Math.round(valorEmprestimo1 / prazoPagamento.value);
}

function calculaSpread() 
{
    spread1 = parseFloat((((Math.random() * 4) + 1) / 100).toFixed(2));
    spread2 = parseFloat((((Math.random() * 4) + 1) / 100).toFixed(2));
    spread3 = parseFloat((((Math.random() * 4) + 1) / 100).toFixed(2));
}

function showFinanciamento() 
{
    if(calcular.classList.contains('clicked'))
    {
        calcular.classList.remove('clicked');
        return;
    }
    else calcular.classList.add('clicked');
    calculaFinanciamento(preçoTotal.value);
    container_resultadoFinanciamento.classList.add('show');
    container_resultadoFinanciamento.setAttribute('style', 'display: flex');
    
    divsFinanciamento[0].innerHTML = "Proposta 1<br><br>Montante Total: " + preçoTotal.value + "€" + "<br>Valor do Empréstimo: " + valorEmprestimo1 + "€" + "<br>Taxa de Juros Global: " + taxaJurosGlobal1 * 100 + "%" + "<br>Spread: " + spread1 * 100 + "%" + "<br>Valor da Entrada Inicial: " + valorEntrada1 * preçoTotal.value + "€" + "<br>Valor Mensal da Prestação: " + prestacaoMensal1 + "€";
    divsFinanciamento[1].innerHTML = "Proposta 2<br><br>Montante Total: " + preçoTotal.value + "€" + "<br>Valor do Empréstimo: " + valorEmprestimo2 + "€" + "<br>Taxa de Juros Global: " + taxaJurosGlobal2 * 100 + "%" + "<br>Spread: " + spread2 * 100 + "%" + "<br>Valor da Entrada Inicial: " + valorEntrada2 * preçoTotal.value + "€" + "<br>Valor Mensal da Prestação: " + prestacaoMensal2 + "€";
    divsFinanciamento[2].innerHTML = "Proposta 3<br><br>Montante Total: " + preçoTotal.value + "€" + "<br>Valor do Empréstimo: " + valorEmprestimo3 + "€" + "<br>Taxa de Juros Global: " + taxaJurosGlobal3 * 100 + "%" + "<br>Spread: " + spread3 * 100 + "%" + "<br>Valor da Entrada Inicial: " + valorEntrada3 * preçoTotal.value + "€" + "<br>Valor Mensal da Prestação: " + prestacaoMensal3 + "€";
}

function resetPanel_CalculaFinanciamento() 
{
    container_financiamento.classList.remove('show');
    container_financiamento.setAttribute('style', 'display: none');
    
    for (let i = 0; i < divsFinanciamento.length; i++) 
    {
        if (divsFinanciamento[i].classList.contains('showCalculaFinanciamento'))
            divsFinanciamento[i].classList.remove('showCalculaFinanciamento');
    }
}

document.querySelector('#btnReset').addEventListener('click', init);
document.querySelector('#btnFechar').addEventListener('click', resetPanel);

function resetPanel()
{
    resetPanel_CalculaFinanciamento();
    resetPanel_CalculaPreco();
}