import { render, screen } from "@testing-library/react";
import { Avatar, Badge, Chip, List, Table, Tooltip, Icons } from "../components/DataDisplay";

const listItems = [
  { title: "Item 1", description: "Detalle", meta: "OK" },
  { title: "Item 2", description: "Detalle 2", meta: "Pendiente" },
];

const cols = [
  { key: "name", header: "Nombre" },
  { key: "role", header: "Rol" },
];
const rows = [
  { name: "Ana", role: "Admin" },
  { name: "Luis", role: "User" },
];

describe("DataDisplay components", () => {
  it("renders Avatar, Badge, Chip", () => {
    render(
      <>
        <Avatar name="Demo User" />
        <Badge color="blue">Nuevo</Badge>
        <Chip>Filtro</Chip>
      </>
    );
    expect(screen.getByLabelText("Demo User")).toBeInTheDocument();
    expect(screen.getByText("Nuevo")).toBeInTheDocument();
    expect(screen.getByText("Filtro")).toBeInTheDocument();
  });

  it("renders List and Table", () => {
    render(
      <>
        <List items={listItems} />
        <Table columns={cols} data={rows} />
      </>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Ana")).toBeInTheDocument();
  });

  it("renders Text and Tooltip", () => {
    render(
      <Tooltip content="Ayuda">
        <Icons name="spark" />
      </Tooltip>
    );
    expect(screen.getByLabelText("spark")).toBeInTheDocument();
  });
});
