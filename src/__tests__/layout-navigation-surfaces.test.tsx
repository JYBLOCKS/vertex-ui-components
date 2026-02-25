import { render, screen } from "@testing-library/react";
import { Box, Container, Flex, Grid } from "../components/Layout";
import {
  Breadcrumbs,
  Drawer,
  FloatButton,
  Menu,
  Pagination,
  Stepper,
  Tabs,
} from "../components/Navigation";
import { Accordion, Card, Footer, Nav, Paper } from "../components/Surfaces";
import { Button } from "../components/Form";

describe("Layout, Navigation, Surfaces components", () => {
  it("renders layout primitives", () => {
    render(
      <Container>
        <Flex>
          <Box>Box</Box>
        </Flex>
        <Grid columns={2}>
          <Box>Grid item</Box>
        </Grid>
      </Container>
    );
    expect(screen.getByText("Box")).toBeInTheDocument();
    expect(screen.getByText("Grid item")).toBeInTheDocument();
  });

  it("renders navigation components", () => {
    render(
      <>
        <Breadcrumbs items={[{ label: "Home" }, { label: "Seccion" }]} />
        <Pagination page={1} totalPages={3} />
        <Stepper steps={[{ label: "A" }, { label: "B" }]} active={0} />
        <Tabs tabs={[{ id: "a", label: "A", content: "Contenido A" }]} />
        <Menu items={[{ label: "Perfil" }]} />
        <Drawer open header="Panel">Contenido</Drawer>
        <FloatButton />
      </>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Contenido A")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
  });

  it("renders surface components", () => {
    render(
      <>
        <Accordion items={[{ id: "a", title: "Titulo", content: "Detalle" }]} />
        <Card title="Card" actions={<Button size="sm">OK</Button>}>
          Cuerpo
        </Card>
        <Nav brand="Brand" actions={<Button size="sm">Accion</Button>}>
          <Button variant="ghost" size="sm">
            Link
          </Button>
        </Nav>
        <Paper elevation="sm">Panel</Paper>
        <Footer left="(c) 2025" right="Soporte">
          Centro
        </Footer>
      </>
    );
    expect(screen.getByText("Titulo")).toBeInTheDocument();
    expect(screen.getByText("Cuerpo")).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("Centro")).toBeInTheDocument();
  });
});
