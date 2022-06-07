import { useSelector, useDispatch } from "react-redux";

export function errorTranslator(errorCode) {
    
    switch (errorCode) {
        case 404 : return "Hello world"
    }
}