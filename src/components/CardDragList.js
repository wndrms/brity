import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

const CardDragList = ({nweets, isDelete}) => {
    const [Cardlist, setlist] = useState([]);
    useEffect(() => {
        setlist(nweets);
    }, []);
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const getItemStyle = (isDragging, draggableStyle, color) => ({
        userSelect: "none",
        boxShadow: isDragging ? "0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.3)" : "",
        background: isDragging ? "rgba(52, 52, 52, 0.8)" : color,

        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
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
                                        className={"card" + (isDelete ? " del" : "")}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                            nweet.cardcolor
                                        )}
                                        onClick={() => {window.location.href=nweet.link}}>
                                        <h3>{nweet.subtitle}</h3>
                                        {isDelete ? (
                                            <button><img src={process.env.PUBLIC_URL + "02-icon-02-solid-check-circle.svg"} alt="삭제 체크"></img></button>
                                        ) : (
                                            <button><img src={process.env.PUBLIC_URL + "02-icon-01-outline-arrows.svg"} alt="이동화살표"></img></button>
                                        )}       
                                        <p>{nweet.title}</p>
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