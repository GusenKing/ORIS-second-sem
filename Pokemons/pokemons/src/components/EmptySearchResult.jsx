function EmptySearchResult(){
    return(
        <div className="empty-results">
            <div>Oops! Try again.</div>
            <div>The pokemon you're looking for is a unicorn. It doesn't exist in the list.</div>
            <img alt="sad pikachu" src="https://www.orthrusonline.ru/static/images/p/nextgen/pikachupartner.png"/>
        </div>
    )
}

export default EmptySearchResult;