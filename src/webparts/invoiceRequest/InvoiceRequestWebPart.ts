import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./components/store/rootReducer";
import InvoiceRequest from "./components/InvoiceRequest";
import { setupPnp } from "./components/utils/spSetup";

export interface IInvoiceRequestWebPartProps {}

export default class InvoiceRequestWebPart extends BaseClientSideWebPart<IInvoiceRequestWebPartProps> {
    private store = createStore(rootReducer, applyMiddleware(thunk));

    public onInit(): Promise<void> {
        setupPnp(this.context);
        return Promise.resolve();
    }

    public render(): void {
        const element = React.createElement(
            Provider,
            { store: this.store },
            React.createElement(InvoiceRequest, {})
        );
        ReactDom.render(element, this.domElement);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }
}
