import * as React from 'react';
import TodoStore from './TodoStore';


// React calls the 'render' function again to update view when its state changes
// The @observer decorator lets react know that the 'TodoList' react component is in TodoStore
@observer
export default class TodoList extends React.Component {

    // Update store values when the p element is clicked
    // this should cause react to call 'render' again and update what <p> looks like 
    handleItem1Change = () => TodoStore.item1 = 'New text';

    handleItem2Change = () => TodoStore.item2 = 'New text';

    render() {

        // Pull multiple variables from the store
        const { item1, item2 } = TodoStore

        // The custom build TodoList React component consist of a div and twp p elements
        return (
            
            // when the value of any element in the return function changes, 
            // react calls render again to change what it looks like
            <div>

                // when the value 
                <p onClick={this.handleItem1Change}>{item1}</p>
                <p onClick={this.handleItem2Change}>{item2}</p>

            </div>
        )
    }
}