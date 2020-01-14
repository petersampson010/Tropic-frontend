import React from 'react' 

export default class SearchBar extends React.Component {

    render() {
        return (
            <div>
                <form onSubmit={e => this.props.searchFV(e)}>
                    <input name="plantsearch"/>
                    <input type="submit" value="Search"/>
                </form>
            </div>
        )
    }

}
