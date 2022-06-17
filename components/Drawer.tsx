import {
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Td,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import {
  MdAdd,
  MdDelete,
  MdFlag,
  MdLocationPin,
  MdPrint,
  MdRemove,
  MdSave,
  MdShare,
} from "react-icons/md";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const insert = <T extends unknown>(arr: T[], index: number, newItem: T) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];

const NavDrawer: React.FC<DrawerProps> = (props) => {
  const { isOpen, onClose } = props;
  const [items, setItems] = useState<string[]>([
    "22 MG",
    "25 MG",
    "30 MG",
    "35 Neuss",
    "40 Neuss",
  ]);
  const totalKm = items.reduce((acc, cur) => acc + cur.length, 0);

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Wählen sie ihre Route</DrawerHeader>

        <DrawerBody>
          <VStack spacing={4} alignItems="start">
            <RadioGroup defaultValue="1">
              <HStack spacing={5}>
                <Radio value="1">Route</Radio>
                <Radio value="2">Rundreise</Radio>
              </HStack>
            </RadioGroup>
            <Grid
              templateColumns="min-content 1fr min-content"
              gap="2"
              width="100%"
            >
              <Box p={2}>S</Box>
              <Input
                placeholder="Start"
                value={items[0]}
                onChange={(e) => {
                  setItems((items) => [e.target.value, ...items.slice(1)]);
                }}
              />
              <IconButton
                aria-label="Aktuellen Standort wählen"
                onClick={() => {
                  items[0] = "42 Krefeld";
                  setItems([...items]);
                }}
              >
                <Icon as={MdLocationPin} />
              </IconButton>
              <Box />
              <Center>
                <IconButton
                  aria-label="Zwischenstopp Hinzufügen"
                  onClick={() => {
                    setItems((items) => {
                      return insert(items, 1, "");
                    });
                  }}
                >
                  <Icon as={MdAdd} />
                </IconButton>
              </Center>
              <Box />
              <Fragment>
                {items.slice(1, items.length - 1).map((item, index) => (
                  <Fragment key={index}>
                    <Box />
                    <Input
                      placeholder="Zwischenstopp"
                      value={items[index + 1]}
                      onChange={(e) => {
                        setItems((items) => [
                          ...items.slice(0, index + 1),
                          e.target.value,
                          ...items.slice(index + 2),
                        ]);
                      }}
                    />
                    <IconButton
                      aria-label="Zwischenstopp Löschen"
                      onClick={() => {
                        console.log("click");
                        setItems((items) => [
                          ...items.slice(0, index + 1),
                          ...items.slice(index + 2),
                        ]);
                      }}
                    >
                      <Icon as={MdDelete} />
                    </IconButton>
                    <Box />
                    <Center>
                      <IconButton
                        aria-label="Zwischenstopp Hinzufügen"
                        onClick={() => {
                          setItems((items) => {
                            return insert(items, index + 2, "");
                          });
                        }}
                      >
                        <Icon as={MdAdd} />
                      </IconButton>
                    </Center>
                    <Box />
                  </Fragment>
                ))}
              </Fragment>
              <Box p={2}>
                <Icon as={MdFlag}></Icon>
              </Box>
              <Input
                placeholder="Ziel"
                value={items[items.length - 1]}
                onChange={(e) => {
                  setItems((items) => [
                    ...items.slice(0, items.length - 1),
                    e.target.value,
                  ]);
                }}
              />
              <Box />
            </Grid>
            <Box />
            <Button width="100%">Route Berechnen</Button>
            <Divider width="100%" />
            <Heading size="md">Ihre Route</Heading>
            <Table>
              <colgroup>
                <col span={1}></col>
                <col span={1} style={{ width: "50px" }}></col>
              </colgroup>
              <Tbody>
                <Tr>
                  <Td>
                    Von: {items[0]}
                    <br />
                    <br />
                    Nach: {items[items.length - 1]}
                  </Td>
                  <Td />
                </Tr>
                {items.map((item, index) => {
                  return (
                    <Tr key={item}>
                      <Td>{item}</Td>
                      {index ? (
                        <Td display="flex" justifyContent="end">
                          {item.length}km
                        </Td>
                      ) : (
                        <Td />
                      )}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            <Flex justifyContent="end" width="100%" paddingRight="6">
              ={totalKm}km
            </Flex>
            <Flex justifyContent="end" width="100%" paddingRight="6">
              ~{Math.floor((totalKm / 15) * 10) / 10}h
            </Flex>
          </VStack>
          <HStack spacing={4} justifyContent="center">
            <IconButton aria-label="Teilen">
              <Icon as={MdShare} />
            </IconButton>
            <IconButton aria-label="Speichern">
              <Icon as={MdSave} />
            </IconButton>
            <IconButton aria-label="Drucken">
              <Icon as={MdPrint} />
            </IconButton>
          </HStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
