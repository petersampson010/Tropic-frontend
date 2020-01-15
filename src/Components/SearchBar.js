import React from 'react' 

export default class SearchBar extends React.Component {

    render() {
        return (
            <div className="search-box">
                <div onClick={this.props.prevPage}>Prev. Page</div>
                <form onSubmit={e => this.props.searchFV(e)}>
                    <input name="plantsearch"/>
                    <input type="submit" value="Search"/>
                </form>
                <div onClick={this.props.nextPage}>Next Page</div>
            </div>
        )
    }

}
