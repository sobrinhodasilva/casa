$( document ).ready(function() {

      let endereco = "https://a3ih6jvb5f4mw.iot.us-west-2.amazonaws.com"
      let device = "esp8266_136837"
      let enderecoRPC = endereco + device +"/rpc"
    //busca sensores
  function sensores(data){
        $.getJSON( endereco, function( data ) {
                  $('#temperatura').text(data.sensores.temperatura);
                  $('#umidade').text(data.sensores.umidade);
                 $("#presensa").css("color",( data.sensores.presensa?"#5bc0de":"#000") );


                var corGas;
                var gas = data.sensores.gas;
                     if (gas<=250){
                         corGas = '#000';

                     }
                     if (gas > 250){

                         corGas = '#5bc0de';

                     }
                     if (gas > 280){
                         corGas = '#f0ad4e';//alerta
                     }
                     if (gas > 300){

                         corGas = '#d9534f' ; // perigo
                     }
                 $("#gas").css("color",corGas);

                 setTimeout(sensores, 2000);
        });

  }

    //Função seta os botoes conforme o estado de cada luz

    function estadoLuz(data){
        $.each(data.luzes, function(name, value){
            marca = (value==1)?true:false ;
            $('input[name="'+name+'"]').prop('checked', marca);
            console.log(name +'=' +marca)
        });

    }

    //sensores();


  //liga led
  $('input').change(function() {
    nome =  $(this).attr('name');
    //console.log(nome);

    // Ligar ou desligar
    if ($(this).prop('checked')){ action = "On"}
    else{action = "Off"}

    parametro = {
      "method": "GPIO.Write",
      "args":{
                "pin": 12,
                "value": 0
              }
    }

    $.post( enderecoRPC, parametro).done(function( data ) {
          //estadoLuz(data);
          console.log(data);
    });

   })



 })
