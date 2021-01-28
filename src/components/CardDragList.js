import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";

const CardDragList = ({nweets, isDelete}) => {
    const history = useHistory();
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
        boxShadow: isDragging && "0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        backgroundImage: color,
        opacity: isDragging ? "0" : "1",

        ...draggableStyle
    });
    const getItemStyle2 = (isDragging, draggableStyle, image) => ({
        userSelect: "none",
        boxShadow: isDragging && "0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        background: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        opacity: isDragging ? "0" : "1",

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
                                        style={nweet.cardcolor ? getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                            nweet.cardcolor,
                                        ) : getItemStyle2(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                            nweet.cardImage,
                                        )}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if(nweet.link) history.push("/edit/" + nweet.id);
                                            else history.push("/edit2/" + nweet.id);
                                        }}>
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
                        <div className="style-box"></div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
            
        </>
    );
}

export default CardDragList;