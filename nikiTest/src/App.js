import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://61d566b72b4f730017a827fe.mockapi.io/nikidata')
      .then((response) => response.json())
      .then((responseData) => {
        const formattedData = responseData.map((item) => ({
          name: item.name,
          lastname: item.lastname,
          job: item.job,
          id: item.id,
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleDelete = (itemId) => {
    fetch(`https://61d566b72b4f730017a827fe.mockapi.io/nikidata/${itemId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== itemId));
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  const handleEdit = (itemId, item) => {
    setEditingItemId(itemId);
    setEditedItem(item);
  };

  const handleUpdate = (itemId) => {
    fetch(`https://61d566b72b4f730017a827fe.mockapi.io/nikidata/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: editedItem.name,
        lastname: editedItem.lastname,
        job: editedItem.job,
      }),
    })
      .then(() => {
        fetchData();
        setEditingItemId(null);
        setEditedItem({});
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <h1>Data Table</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            {/* Table header */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Lastname</th>
                <th>Job</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  {/* Name */}
                  <td>
                    {editingItemId === item.id ? (
                      <input
                        type="text"
                        value={editedItem.name || ''}
                        onChange={(e) =>
                          setEditedItem((prevItem) => ({
                            ...prevItem,
                            name: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </td>
                  {/* Lastname */}
                  <td>
                    {editingItemId === item.id ? (
                      <input
                        type="text"
                        value={editedItem.lastname || ''}
                        onChange={(e) =>
                          setEditedItem((prevItem) => ({
                            ...prevItem,
                            lastname: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span>{item.lastname}</span>
                    )}
                  </td>
                  {/* Job */}
                  <td>
                    {editingItemId === item.id ? (
                      <input
                        type="text"
                        value={editedItem.job || ''}
                        onChange={(e) =>
                          setEditedItem((prevItem) => ({
                            ...prevItem,
                            job: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <span>{item.job}</span>
                    )}
                  </td>
                  {/* Actions */}
                  <td>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                    {editingItemId === item.id ? (
                      <button onClick={() => handleUpdate(item.id)}>Save</button>
                    ) : (
                      <button onClick={() => handleEdit(item.id, item)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={currentPage === pageNumber ? 'active' : ''}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              disabled={currentItems.length < itemsPerPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
