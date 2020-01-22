import React from 'react' 

export default class SearchBar extends React.Component {

    render() {
        return (
            <div className="search-box">
                {this.props.num === 0 ? <div></div> : <div onClick={this.props.prevPage} className="page-control">Previous Plants</div>}
                {(this.props.searchSelection === null) ?  null 
                : <form onSubmit={e => this.props.searchFV(e)}>
                    <input name="plantsearch"/>
                    <input type="submit" value="Search"/>
                </form>}
                {this.props.num > 96 ? <div></div> : <div onClick={this.props.nextPage} className="page-control">Next Plants</div>}
            </div>
        )
    }

}
