import './App.scss'
import Grid from './Grid'

function App(): JSX.Element {
    return <Grid cellHeight={40} cellWidth={140} rowCount={1000000} columnCount={1000000} />
}

export default App
