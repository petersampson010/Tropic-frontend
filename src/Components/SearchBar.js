import React from 'react' 

export default class SearchBar extends React.Component {

    render() {
        return (
            <div className="search-box">
                <div onClick={this.props.prevPage} className="page-control">Prev. Page</div>
                {(this.props.searchSelection === null) ?  null 
                : <form onSubmit={e => this.props.searchFV(e)}>
                    <input name="plantsearch"/>
                    <input type="submit" value="Search"/>
                </form>}
                <div onClick={this.props.nextPage} className="page-control">Next Page</div>
            </div>
        )
    }

}
