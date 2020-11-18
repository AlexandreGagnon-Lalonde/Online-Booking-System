import styled from "styled-components";
import { COLORS } from "../../constant";

const StyledWrapper = styled.div`
  .fc {
    background-color: ${COLORS.mediumGray};
  }

  .fc-timegrid-event,
  .fc-timegrid-event-harness {
    background-color: ${COLORS.lightGray};
    border: none;
    border-radius: 5px;
    margin: 2px;
    transition: all 0.2s;

    &:hover {
      background-color: ${COLORS.darkerLightGray};
    }
  }

  .fc-event-time,
  .fc-event-title {
    color: ${COLORS.darkGray};
  }

  .fc-prev-button,
  .fc-next-button {
    background-color: ${COLORS.beige};
    color: ${COLORS.orange};
    height: 40px;

    &:hover {
      background-color: ${COLORS.orange};
      color: ${COLORS.beige};
    }
  }

  .fc-today-button {
    background-color: ${COLORS.beige};
    color: ${COLORS.orange};
    font-weight: bold;
    height: 40px;

    &:hover {
      background-color: ${COLORS.orange};
      color: ${COLORS.beige};
    }
    &:disabled {
      background-color: ${COLORS.lightGray};
      color: ${COLORS.darkGray};
    }
  }

  .fc-timegrid-slot {
    border: none;
  }
  .fc-timegrid-col {
    border: 1px solid ${COLORS.beige};
  }
  .fc-col-header-cell {
    border: 1px solid ${COLORS.beige};
  }
  .fc-timegrid-axis {
    border: 1px solid ${COLORS.beige};
  }
  .fc-scrollgrid {
    border: 1px solid ${COLORS.beige};
    border-radius: 5px;
  }
`;

export default StyledWrapper;
