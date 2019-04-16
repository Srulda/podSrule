
class Renderer {

    renderData(data) {
        let source = $("#podcasts-template").html()
        let template = Handlebars.compile(source)
        let newHtml = template({data})
        $(".podcasts").empty().append(newHtml)
    }

}
