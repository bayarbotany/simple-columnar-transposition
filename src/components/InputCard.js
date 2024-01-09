import { useHookstate } from '@hookstate/core';
import { Button, Card, Col, Divider, Input, Row, Typography } from 'antd';
import React from 'react';
import { Container } from 'react-bootstrap';
import states from '../states';
import functions from '../functions/functions';

const RenderTypes = () => {
  const types = useHookstate(states.cipherType);
  return (
    <Row
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      {types.options.get().map((type, index) => {
        return (
          <Col key={type.value} style={{ marginLeft: 5, marginRight: 5 }}>
            <Button
              type={
                type.value === types.nested('value').get()
                  ? 'primary'
                  : 'dashed'
              }
              onClick={() => {
                types.nested('value').set(type.value);
                types.nested('label').set(type.label);
              }}
            >
              {type.label}
            </Button>
          </Col>
        );
      })}
    </Row>
  );
};

const RenderMode = () => {
  const mode = useHookstate(states.cipherMode);
  return (
    <Row
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      {mode.options.get().map((type, index) => {
        return (
          <Col key={type.value} style={{ marginLeft: 5, marginRight: 5 }}>
            <Button
              type={
                type.value === mode.nested('value').get() ? 'primary' : 'dashed'
              }
              onClick={() => {
                mode.nested('value').set(type.value);
                mode.nested('label').set(type.label);
              }}
            >
              {type.label}
            </Button>
          </Col>
        );
      })}
    </Row>
  );
};

function InputCard() {
  const type = useHookstate(states.cipherType.nested('value'));

  return (
    <Card
      style={{
        flex: 0.45,
      }}
    >
      <Container
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography.Title level={4}>Input</Typography.Title>
        <Input
          onChange={(e) => {
            states.text.set(e.target.value);
          }}
        />
        <Divider />

        {type.get() === 'columnarTranspositionWithBlockSize' ? (
          <>
            <Typography.Title
              style={{
                marginTop: 10,
              }}
              level={4}
            >
              Block Size
            </Typography.Title>
            <Input
              onChange={(e) => {
                states.blockSize.set(e.target.value);
              }}
            />
            <Divider />
          </>
        ) : (
          <>
            <Typography.Title
              style={{
                marginTop: 10,
              }}
              level={4}
            >
              Key
            </Typography.Title>
            <Input
              onChange={(e) => {
                states.key.set(e.target.value);
              }}
            />
            <Divider />
          </>
        )}
      </Container>
      <Divider />
      <Typography.Text>Cipher Mode</Typography.Text>
      <Row>
        <RenderMode />
      </Row>
      <Divider />
      <Row>
        <Typography.Text>Cipher Type</Typography.Text>
      </Row>
      <RenderTypes />
      <Divider />
      <Row>
        <Col span={24}>
          <Button
            onClick={() => {
              functions.compute();
            }}
          >
            Compute
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default InputCard;
