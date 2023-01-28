// A mock function to mimic making an async request for data
export function fetchSelectedRoomId(selectedRoomId = '') {
    return new Promise<{ data: string }>((resolve) =>
      setTimeout(() => resolve({ data: selectedRoomId }), 500)
    );
  }
  