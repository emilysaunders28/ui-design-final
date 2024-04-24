const PageNav = (props) => {
    const currentPage = props.currentPage
    const numberOfPages = props.numberOfPages
    const pageList = Array.from(Array(numberOfPages), (_, index) => index + 1);
    const term = props.term
    const type = props.type

    const url = term === 'final' ? `/${term}/` : `/${term}/${type}/`

    const nextPageURL = `${url}${currentPage+1}`
    const previousPageURL = `${url}${currentPage-1}`

    return (
        <div className="page-nav">
            {currentPage !== 1 && <a href={previousPageURL}>Back</a> }
            {pageList.map(number => {
                return <a key={number} href={`${url}${number}`}>{number}</a>
            })}
            {currentPage !== numberOfPages && <a href={nextPageURL}>Next</a> }
        </div>
    );
}
 
export default PageNav;