import React from 'react'

interface IProps {
    rowCount: number
    columnCount: number
    cellWidth: number
    cellHeight: number
}

function Grid(props: IProps): JSX.Element {
    const [coordinate, setCoordinate] = React.useState({
        x: 0,
        y: 0,
    })

    const [containerMeta, setContainerMeta] = React.useState({
        width: 0,
        height: 0,
    })

    const gridContentStyle = {
        width: `${props.cellWidth * props.columnCount}px`,
        height: `${props.cellHeight * props.rowCount}px`,
    }

    // React will call that callback whenever the ref gets attached to a different node
    const updateSize = React.useCallback((ref): void => {
        const { clientWidth, clientHeight } = ref
        setContainerMeta({
            width: clientWidth,
            height: clientHeight,
        })
    }, [])

    function onScroll(evt: React.UIEvent<HTMLDivElement>): void {
        const $grid = evt.currentTarget
        const { scrollTop, scrollLeft } = $grid
        const coordinate = {
            x: Math.floor(scrollTop / props.cellHeight),
            y: Math.floor(scrollLeft / props.cellWidth),
        }

        setCoordinate(coordinate)
    }

    function renderCells(): JSX.Element[] {
        let { x: row, y: column } = coordinate
        const { width, height } = containerMeta
        const itemColumnPerWindow = Math.floor(width / props.cellWidth) * 2
        const itemRowPerWindow = Math.floor(height / props.cellHeight) * 2

        const cellList = []
        for (let i = row; i < itemRowPerWindow + row; i++) {
            for (let j = column; j < itemColumnPerWindow + column; j++) {
                const top = props.cellHeight * i
                const left = props.cellWidth * j
                cellList.push(
                    <div
                        key={`${i}-${j}`}
                        className="cell-item"
                        style={{
                            width: `${props.cellWidth}px`,
                            height: `${props.cellHeight}px`,
                            position: 'absolute',
                            left: `${left}px`,
                            top: `${top}px`,
                        }}
                    ></div>,
                )
            }
        }

        return cellList
    }

    return (
        <div className="grid-container" onScroll={onScroll} ref={updateSize}>
            <div className="grid-content" style={gridContentStyle}>
                {renderCells()}
            </div>
        </div>
    )
}

export default Grid
