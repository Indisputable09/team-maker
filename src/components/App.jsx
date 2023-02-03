import React from 'react';
import { nanoid } from 'nanoid';
import { FaTshirt } from 'react-icons/fa';

export const App = () => {
  const [state, setState] = React.useState([
    {
      id: nanoid(),
      color: 'black',
      number: 0,
    },
  ]);
  console.log('state', state);

  const handleAddClick = () => {
    return setState(prevState => {
      return [
        ...prevState,
        {
          id: nanoid(),
          color: 'black',
          number: 0,
        },
      ];
    });
  };

  const handleDeleteClick = () => {
    const newArray = state.filter((item, index) => {
      return index !== state.length - 1;
    });
    console.log('newArray', newArray);
    setState(newArray);
  };

  const handleChange = index => e => {
    const newArray = state.map((item, i) => {
      if (i === index) {
        return { ...item, color: e.target.value };
      } else return item;
    });
    setState([...newArray]);
  };

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <div>
        <button type="button" onClick={handleDeleteClick}>
          Remove
        </button>
        <button type="button" onClick={handleAddClick}>
          Add
        </button>
      </div>
      <ul style={{ outline: '2px solid red' }}>
        {state.map((item, index) => {
          return (
            <li key={item.id}>
              <FaTshirt color={item.color} size={30} />
              <input value={item.color} onChange={handleChange(index)} />
              <input />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
