import React, { useState, useEffect, createContext } from "react";
import { useHistory, useParams } from "react-router-dom";

const TicketsContext = createContext();

const TicketsContextProvider = ({ children }) => {
	const [currentTicket, setCurrentTicket] = useState({ id: null, code: null });
    const history = useHistory();

    useEffect(() => {
        if (currentTicket.id !== null) {
        	//console.log(currentTicket);
        	//console.log(setCurrentTicket);
        	if(currentTicket.tagCurrent){
				history.push(`/tickettagged/${currentTicket.tagCurrent}/${currentTicket.uuid}`);
        	}else{
        		history.push(`/tickets/${currentTicket.uuid}`);
        	}
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTicket])

	return (
		<TicketsContext.Provider
			value={{ currentTicket, setCurrentTicket }}
		>
			{children}
		</TicketsContext.Provider>
	);
};

export { TicketsContext, TicketsContextProvider };
