import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, {
  ActionContainer,
  TableData,
  TableHeadings,
  TableRows,
} from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddShelving from "@/components/shelving/addShelving";
import ShelvingSearchBar from "@/components/shelving/shelvingSearchBar";
const Shelving = () => {
  const [shelves, setShelves] = useState([]);
  const [filteredShelves, setFilteredShelves] = useState([]); // State to store filtered shelves
  const [activeActionContainer, setActiveActionContainer] = useState(-1);
  const [isAddShelfPopupOpen, setIsAddShelfPopupOpen] = useState(false);

  useEffect(() => {
    // Simulated static shelving data
    const staticShelvingData = [
      {
        shelfID: "S001",
        shelfName: "Shelf A",
        category: "Bar Soap",
        capacity: 50,
        currentItems: 30,
        status: "Active",
        description: "This shelf is for Bar Soap.",
      },
      {
        shelfID: "S002",
        shelfName: "Shelf B",
        category: "Liquid Soap",
        capacity: 20,
        currentItems: 15,
        status: "Active",
        description: "This shelf is for Liquid Soap.",
      },
    ];

    setShelves(staticShelvingData);
    setFilteredShelves(staticShelvingData);
  }, []);

  const handleSearchShelves = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filteredShelves = shelves.filter((shelf) =>
      shelf.shelfName.toLowerCase().includes(lowerCaseSearchTerm)
    );

    setFilteredShelves(filteredShelves);
  };

  return (
    <DashboardLayout>
      <PageTitle title="Shelving" />

      <StyledPanel>
        <ShelvingSearchBar
          setIsAddShelfPopupOpen={setIsAddShelfPopupOpen}
          setShelvesDisplay={setFilteredShelves}
          onSearch={handleSearchShelves}
        />

        <Table>
          <tbody>
            <TableRows $heading>
              <TableHeadings>Shelf ID</TableHeadings>
              <TableHeadings>Shelf Name</TableHeadings>
              <TableHeadings>Category</TableHeadings>
              <TableHeadings>Capacity</TableHeadings>
              <TableHeadings>Current Items</TableHeadings>
              <TableHeadings>Status</TableHeadings>
              <TableHeadings>Description</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {filteredShelves.map((shelf, index) => (
              <TableRows key={shelf.shelfID}>
                <TableData>{shelf.shelfID}</TableData>
                <TableData>{shelf.shelfName}</TableData>
                <TableData>{shelf.category}</TableData>
                <TableData>{shelf.capacity}</TableData>
                <TableData>{shelf.currentItems}</TableData>
                <TableData>{shelf.status}</TableData>
                <TableData>{shelf.description}</TableData>
                <TableData>
                  <FontAwesomeIcon
                    className="ellipsis"
                    icon={faEllipsis}
                    onClick={() =>
                      activeActionContainer === index
                        ? setActiveActionContainer(-1)
                        : setActiveActionContainer(index)
                    }
                  />

                  {activeActionContainer === index && (
                    <ActionContainer
                      onClick={() => setActiveActionContainer(-1)}
                    >
                      <p>
                        <FontAwesomeIcon icon={faPen} />
                        Edit
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </p>
                    </ActionContainer>
                  )}
                </TableData>
              </TableRows>
            ))}
          </tbody>
        </Table>
      </StyledPanel>

      {isAddShelfPopupOpen && (
        <AddShelving
          setIsAddShelfPopupOpen={setIsAddShelfPopupOpen}
          getShelvesFunc={getShelvesFunc}
        />
      )}
    </DashboardLayout>
  );
};

export default Shelving;
