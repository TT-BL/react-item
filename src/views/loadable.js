import React, { Component } from 'react'

 const Loadable = ({
    loader,
    loading:Loading
}) => {
    return class LoadableComponent extends Component {
        state = {
            LoadedComponent: null
        }
        componentDidMount() {
            console.log('22')
            loader().then(req => {
                this.setState = ({
                    LoadedComponent: req.default
                })
            })
        }
        render() {
            console.log('11')
            const {
                LoadedComponent
            } = this.state
            return (
                LoadedComponent
                    ?
                    <LoadedComponent/>
                    :
                    <Loading/>
            )
        }
    }
}
export default Loadable
