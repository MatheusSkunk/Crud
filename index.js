var dados = []

function ApagaRegistro(id) {
  let _confirm = confirm("Deseja Realmente excluir esse registro?")
  if (_confirm) {
    for (let i = 0; i < dados.length; i++) {
      if (dados[i].ID == id) {
        dados.splice(i, 1)
      }
    }
    PopulaTabela()
  }
}
function EditaRegistro(id) {
  $("#modalReg").modal("show")

  dados.forEach(function (item) {
    if (item.ID == id) {
      $("txtNome").val(item.Nome)
      $("txtDtNascimento").val(item.DtNascimento.substr(6, 4) + "-" + item.DtNascimento.substr(3, 2) + "-" + item.DtNascimento.substr(0, 2))
      $("txtEmail").val(item.Email)
    }
  })
}

function PopulaTabela() {
  if (Array.isArray(dados)) {

    const dadoLocal = localStorage.getItem("__dados__", JSON.stringify(dados))
    $("#bodyTable").html("")

    Array.from(dadoLocal).forEach(function (item) {
      console.log(item.Nome)
      //TEMPLATE STRING  
      $("#bodyTable").append(`z<tr> 
          <td>${item.ID}</td>
          <td>${item.Nome}</td>
          <td>${item.DtNascimento}</td>
          <td>${item.Email}</td>
          <td><button type="button" class="btn btn-primary"onclick="javascript:ditaRegistro(${item.ID})>< i class="fa fa-edit"/>Editar</button></td>
          <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.ID});"><i i class="fa fa-trash"></i></i></button></td>
      </tr>`)

    })
  }
}


$(function () {
  //EXECUTA AO CARREGAR DA TELA
  dados = JSON.parse(localStorage.getItem("__dados__"))

  if (dados) {
    PopulaTabela()
  }

  $("#btnSave").click(function () {
    //Evento Click do Botão Salvar


    let Nome = $("#txtNome").val()
    let DtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
    let Email = $("#txtEmail").val()


    let registro = {}

    registro.Nome = Nome
    registro.DtNascimento = DtNascimento
    registro.Email = Email

    var arr = dados || []
    registro.ID = arr.length + 1
    dados.unshift(registro)
    // console.log(dados)

    alert("Registro Salvo com Sucesso")
    $("#modalReg").modal("hide")



    //LIMPA CAMPO
    $("#txtNome").val("")
    $("txtDtNascimento").val("")
    $("txtEmail").val("")

    PopulaTabela()


  })




})
