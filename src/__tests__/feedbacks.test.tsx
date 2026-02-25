import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Alert,
  Backdrop,
  Dialog,
  Progress,
  Skeleton,
  Snackbar,
} from "../components/Feedbacks";
import { Button } from "../components/Form";

describe("Feedback components", () => {
  it("renders Alert and Progress", () => {
    render(
      <>
        <Alert tone="success" title="Listo">
          Guardado
        </Alert>
        <Progress value={30} label="Carga" />
      </>,
    );
    expect(screen.getByText("Listo")).toBeInTheDocument();
    expect(screen.getByText("Carga")).toBeInTheDocument();
  });

  it("renders Dialog with actions", () => {
    render(
      <Dialog
        open
        title="Confirmar"
        actions={
          <>
            <Button>Cancelar</Button>
            <Button>Aceptar</Button>
          </>
        }
      >
        Contenido
      </Dialog>,
    );
    expect(screen.getByText("Confirmar")).toBeInTheDocument();
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("renders Skeleton and Snackbar", () => {
    render(
      <>
        <Skeleton width={100} height={10} />
        <Snackbar open message="Hola" />
      </>,
    );
    expect(screen.getByText("Hola")).toBeInTheDocument();
  });

  it("renders Backdrop when open", () => {
    const { container } = render(<Backdrop open />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
