declare module 'react-trello' {
    import { Component } from 'react';
  
    interface Card {
      id: string;
      title: string;
      description?: string;
      label?: string;
      metadata?: unknown;

      draggable?: boolean;
    }
  
    interface Lane {
      id: string;
      title: string;
      label?: string;
      cards: Card[];
    }
  
    interface BoardProps {
      data: { lanes: Lane[] };
      draggable?: boolean;
      editable?: boolean;
      canAddLanes?: boolean;
      hideCardDeleteIcon?: boolean;
      onDataChange?: (newData: { lanes: Lane[] }) => void;
    }
  
    class Board extends Component<BoardProps> {}
  
    export default Board;
  }
  