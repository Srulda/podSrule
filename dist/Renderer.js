class Renderer{

    renderData(data){
    console.log(data)
    console.log("render")
    let source = $("#podcasts-template").html()
    let template = Handlebars.compile(source)
    let newHtml = template({data}) 
    $(".podcasts").empty().append(newHtml)
}
}