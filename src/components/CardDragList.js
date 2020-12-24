import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

const CardDragList = (nweets) => {
    const [Cardlist, setlist] = useState([]);
    useEffect(() => {
        setlist(nweets.nweets);
    }, []);
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        background: isDragging ? "lightgreen" : "grey",

        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "white" : "white",
        padding: grid,
        width: 320
    });

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const Cardlists = reorder(
            Cardlist,
            result.source.index,
            result.destination.index
        );
        setlist(Cardlists);
    };
    console.log(Cardlist);
    return (
        <>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {Cardlist.map((nweet, index) => (
                            <Draggable key={nweet.id} draggableId={nweet.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        className="card"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )} href={"http://" + nweet.text}>
                                        <h3>📢</h3>
                                        <button><img src="" alt="이동화살표"></img></button>
                                        <p>{nweet.text}</p>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
            
        </>
    );
}

export default CardDragList;