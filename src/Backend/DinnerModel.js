import React, { Component } from 'react'
import ObservableModel from "./ObservableModel";

class DinnerModel extends ObservableModel {
    constructor() {
        super();
    }


}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;