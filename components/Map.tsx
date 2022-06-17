import { MapContainer, TileLayer } from "react-leaflet";
import { Icon, IconButton, useDisclosure, VStack } from "@chakra-ui/react";
import { MdAdd, MdMenu, MdRemove } from "react-icons/md";
import NavDrawer from "./Drawer";

const Map: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });

  return (
    <MapContainer center={[51.16, 6.68]} zoom={13} zoomControl={false}>
      <IconButton
        aria-label="open drawer"
        position="absolute"
        zIndex="1001"
        margin="2"
        fontSize="2xl"
        onClick={onOpen}
      >
        <Icon as={MdMenu} />
      </IconButton>
      <VStack position="absolute" zIndex="1001" margin="2" right="0">
        <IconButton aria-label="open drawer" margin="2" fontSize="2xl">
          <Icon as={MdAdd} />
        </IconButton>
        <IconButton aria-label="open drawer" margin="2" fontSize="2xl">
          <Icon as={MdRemove} />
        </IconButton>
      </VStack>
      <NavDrawer onClose={onClose} isOpen={isOpen} />
      <TileLayer url="https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=395f259a02cd44a58707b6aff7921773" />
    </MapContainer>
  );
};

export default Map;
