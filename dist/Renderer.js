class Renderer {

    

    renderDiscovered(podcasts) {
        let source = $("#discover-podcasts-template").html()
        let template = Handlebars.compile(source)
        let newHTML = template({ podcasts })
        
        $("#discovery-container").empty().append(newHTML)
    }

    renderSaved(podcasts) {
        let source = $("#saved-podcasts-template").html()
        let template = Handlebars.compile(source)
        let newHTML = template({ podcasts })
        
        $("#sidebar").empty().append(newHTML)
    }

    renderData(data) {
        let source = $("#podcasts-template").html()
        let template = Handlebars.compile(source)
        let newHtml = template({data})
        $(".podcasts").empty().append(newHtml)
    }
}