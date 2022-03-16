// console.log("check");


even_text_spread()
function even_text_spread(){

var elem_count=0;


$(".even-text-spread").find("*").each(function(){
    elem_count+=1;
});

var percentage=0;
if(elem_count>0){
    percentage=100/elem_count;
}

$(".even-text-spread").find("*").each(function(){
    
    $(this).attr("style", "width:"+percentage.toString()+"%;");
    $(this).addClass("text-center");

});


}