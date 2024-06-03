import React, { useState } from 'react';
import { Box, Button, Container, Table, Tbody, Td, Th, Thead, Tr, VStack, Input, Textarea } from '@chakra-ui/react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';

const Main = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', description: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = () => {
    addEvent.mutate(newEvent, {
      onSuccess: () => setNewEvent({ name: '', date: '', description: '' })
    });
  };

  const handleUpdateEvent = (event) => {
    updateEvent.mutate(event, {
      onSuccess: () => setEditingEvent(null)
    });
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events</div>;

  return (
    <Container maxW="container.lg">
      <VStack spacing={4} align="stretch">
        <Box>
          <Input
            placeholder="Event Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <Input
            placeholder="Event Date"
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <Textarea
            placeholder="Event Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
          <Button onClick={handleAddEvent}>Add Event</Button>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map((event) => (
              <Tr key={event.id}>
                <Td>
                  {editingEvent?.id === event.id ? (
                    <Input
                      value={editingEvent.name}
                      onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                    />
                  ) : (
                    event.name
                  )}
                </Td>
                <Td>
                  {editingEvent?.id === event.id ? (
                    <Input
                      type="date"
                      value={editingEvent.date}
                      onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    />
                  ) : (
                    event.date
                  )}
                </Td>
                <Td>
                  {editingEvent?.id === event.id ? (
                    <Textarea
                      value={editingEvent.description}
                      onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                    />
                  ) : (
                    event.description
                  )}
                </Td>
                <Td>
                  {editingEvent?.id === event.id ? (
                    <Button onClick={() => handleUpdateEvent(editingEvent)}>Save</Button>
                  ) : (
                    <Button onClick={() => setEditingEvent(event)}>Edit</Button>
                  )}
                  <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Main;