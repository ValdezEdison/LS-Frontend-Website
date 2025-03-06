
const Pagination = () => {
    return (
        <div className="paginationMainWrapper">
            <div className="pagePrev disabled"><span>&lt;</span> Previous</div>
            <div className="pageNum"><span>1</span></div>
            <div className="pageNum active"><span>2</span></div>
            <div className="pageNum"><span>3</span></div>
            <div className="pageNum "><span>4</span></div>
            <div className="pageNum "><span>5</span></div>
            <div className="pageNum"><span>...</span></div>
            <div className="pageNum"><span>14</span></div>
            <div className="pagePrev"> Next <span>&gt;</span></div>
        </div>
    )
}

export default Pagination