//load language setting from local storage
var language = "english";

//event handler
$(document).ready(function() {

    var lang = window.location.href.split( '#' );
  		if (lang.length > 1) {
  			if (lang[1]=="Gr")
  			 changeLanguage("greek");
  		 }
       else
    changeLanguage(language);
    $("#language").on(
        'click',
        function() {
            if ($("#language").attr('src') == "media/imgs/english.png") {
                changeLanguage("english");

            } else {

                changeLanguage("greek");
            }
        }
    );
});

function refreshLanguage() {
    $("#introText").text(language.introText);
    $("#introSubText").html(language.introSubText);

    $("#homeButton").html(language.homeButton);
    $("#examples").html(language.examples);
    $("#help").html(language.help);

    $("#information").html(language.information)
    $("#manual").html(language.manual)
    $("#manual").attr("href", language.manualUrl)
    $("#designG").html(language.designG)
    $("#loadG").html(language.loadG)
    //$("label[for='loadGame']").text(language.loadG)

    $("#play").html(language.play)
    $("#download").html(language.download)
    $("#objects_Name").html(language.objects_Name)
    $("#tableField").html(language.tableField)
    $("#edit").html(language.edit)
    $("#count").html(language.count)
    $("#start").html(language.start)
    $("#stop").html(language.stop)
    $("#close").html(language.close)
    $("#downloadScore").html(language.downloadScore)
    $("#gameOver").html(language.gameOver)
    $("#category").html(language.category)
    $("#classifObj").html(language.classifObj)
    $("#classUncl").html(language.classUncl)
    scoreModal = language.scoreModal;
    playAnswersTable = language.playAnswersTable;
    deleteIco = language.deleteIco;
    $("#addPoint").attr("title", language.addPoint)
    $("#deleteField").attr("title", language.deleteField)
    $("#addAttribute").html("title", language.addAttribute)
    $("#delCat").attr("title", language.delCat)


    $("#classesofAnimalsText").html(language.classesofAnimalsText)
    $("#seasonalDietText").html(language.seasonalDietText)
    $("#theNumbersText").html(language.theNumbersText)
    $("#fallingAnglesText").html(language.fallingAnglesText);
    $("#theAppGameText").html(language.theAppGameText)
    $("#biodegradableMaterialText").html(language.biodegradableMaterialText)
    $("#howLongForDegradationText").html(language.howLongForDegradationText)
    $("#ancientGreekSyntaxText").html(language.ancientGreekSyntaxText)
    $("#ancientGreekSyntaxText").attr("href", language.AncientGreekGame);
    $("#howLongForDegradationText").attr("href", language.DegradationGame);
    $("#biodegradableMaterialText").attr("href", language.BiodegradableGame);
    $("#theAppGameText").attr("href", language.AppGame);
    $("#theNumbersText").attr("href", language.TheNumbersGame);
    $("#fallingAnglesText").attr("href", language.FallingAnglesGame);
    $("#seasonalDietText").attr("href", language.FruitsSeasonsGame);
    $("#classesofAnimalsText").attr("href", language.AnimalsClassesGame);


  //  $("#ancientGreekNounsText").html(language.ancientGreekNounsText)
  //  $("#AncientGreekAnimalsText").html(language.AncientGreekAnimalsText)

    $("#messageSave").text(language.messageSave)
    $("#name").text(language.name)

    for (var name of ['show', 'classtable', 'field1', 'field2'])
        $("#" + name).html(language[name]);

    for (var name of ['image', 'text', 'shape'])
        $("option[value=" + name + "]").text(language[name]);

    // for (var name of ['circle','rectangle'])
    //   $("option[value="+name+"]").text(language[name]);



    //SorterGame.defaultValues.text=language.text

}

function changeLanguage(lang) {
    switch (lang){

      case "english":
        language = english;
        $("#language").attr("src", "media/imgs/greek.png")

        $("#ancientGreekNounsText").hide();
        $("#AncientGreekAnimalsText").hide();
        $("#Latin").hide();
        $("#ancientparenthetic").hide();
        $("#history").hide();
        $("#philosophy").hide();
        $("#ancientverbs").hide();



        break;

      case "greek":
        language = greek;
        $("#language").attr("src", "media/imgs/english.png")

      //  $("#ancientGreekNounsText").show();
      //  $("#AncientGreekAnimalsText").show();
      $("#ancientGreekNounsText").hide();
      $("#AncientGreekAnimalsText").hide();
        $("#Latin").show();
        $("#ancientparenthetic").show();
        $("#history").show();
        $("#philosophy").show();
        $("#ancientverbs").show();


        break;

    }

  //  localStorage.setItem('language', lang);
    //alert(lang);
    refreshLanguage();
}
