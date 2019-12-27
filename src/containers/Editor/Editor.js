import React, {Component} from 'react';
import axiosApp from "../../axios-app";

class Editor extends Component {
    state = {
        page: '',
        title: '',
        description: '',
    };

    inputHandler = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    componentDidMount() {
        this.setState({page: 'about'});
        this.renderData();
    }

    renderData = async () => {
        const page = this.state.page;
        const request = await axiosApp.get(`${page}.json`);
        this.setState({description: request.data.description, title: request.data.title})
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.page !== prevState.page) {
            this.renderData()
        }
    }

    saveChanges = async (event) => {
        event.preventDefault();
        const patch = {
            title: this.state.title,
            description: this.state.description,
        };
        await axiosApp.put(`${this.state.page}.json`, patch);
        this.props.history.push(`/pages/${this.state.page}`);
    };


    render() {
        return (
            <div>
                <form onSubmit={this.saveChanges}>
                    <h4>Page</h4>
                    <select name="page" onChange={this.inputHandler} value={this.state.page}>
                        <option>about</option>
                        <option>contacts</option>
                        <option>history</option>
                        <option>news</option>
                        <option>partners</option>
                    </select>
                    <h4>Description</h4>
                    <textarea name="description"
                              cols="30" rows="10"
                              value={this.state.description}
                              onChange={this.inputHandler}/>
                              <button type="submit" className="btn btn-success">Save</button>
                </form>
            </div>
        );
    }
}

export default Editor;