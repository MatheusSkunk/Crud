let dados = []
let edit = 0
function ApagaRegistro(id) {
  let _confirm = confirm("Deseja Realmente excluir esse registro?")
  if (_confirm) {
    for (let i = 0; i < dados.length; i++) {
      if (dados[i].ID == id) {
        console.log(dados[i])
        dados.splice(i, 1)
        localStorage.setItem("__dados__", JSON.stringify(dados))
      }
    }
    PopulaTabela()
  }
}
function EditaRegistro(id) {
  $("#modalReg").modal("show")
  dados = JSON.parse(localStorage.getItem("__dados__"))
  dados.forEach(function (item) {
    if (item.ID == id) {
      $("#txtNome").val(item.Nome)
      $("#txtDtNascimento").val(item.DtNascimento.substr(6, 4) + "-" + item.DtNascimento.substr(3, 2) + "-" + item.DtNascimento.substr(0, 2))
      $("#txtEmail").val(item.Email)
      edit = id
    }
  })
}

function PopulaTabela() {
  if (Array.isArray(dados)) {
    const dadoLocal = localStorage.getItem("__dados__")
    $("#bodyTable").html("")
    Array.from(JSON.parse(dadoLocal)).forEach(function (item) {
      //TEMPLATE STRING  
      $("#bodyTable").append(`z<tr> 
          <td>${item.ID}</td>
          <td>${item.Nome}</td>
          <td>${item.DtNascimento}</td>
          <td>${item.Email}</td>
          <td><button type="button" class="btn btn-primary" onclick="javascript:EditaRegistro(${item.ID});"><i class="fa fa-edit"></i></button></td>
          <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.ID});"><i class="fa fa-trash"></i></button></td>
      </tr>`)

    })
  }
}


$(function () {
  //EXECUTA AO CARREGAR DA TELA
  dados = JSON.parse(localStorage.getItem("__dados__"))

  if (dados) {
    PopulaTabela()
  } else {
    dados = []
  }

  $("#btnSave").click(function () {
    //Evento Click do Botão Salvar
    let Nome = $("#txtNome").val()
    let DtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
    let Email = $("#txtEmail").val()
    
    if (edit > 0) {
      let dadosSearch = dados.find(item => item.ID === edit)

      dadosSearch.Nome = Nome
      dadosSearch.DtNascimento = DtNascimento
      dadosSearch.Email = Email
      localStorage.setItem("__dados__", JSON.stringify(dados))
      edit = 0
      PopulaTabela()
      alert("Registro Alterado com Sucesso")
      $("#modalReg").modal("hide")
      clear()
      return 
    }


    let registro = {}

    registro.Nome = Nome
    registro.DtNascimento = DtNascimento
    registro.Email = Email
    var arr = dados || []
    registro.ID = arr.length + 1
    dados.unshift(registro)
    localStorage.setItem("__dados__", JSON.stringify(dados))
    
    PopulaTabela()
    alert("Registro Salvo com Sucesso")
    $("#modalReg").modal("hide")



    //LIMPA CAMPO
    clear()

   


  })


  function clear() {
    $("#txtNome").val("")
    $("#txtDtNascimento").val("")
    $("#txtEmail").val("")
  }

})
