import { Button, Card, Col, Row, Statistic, Typography } from 'antd';
import React, { useEffect } from 'react';
import states from '../states';
import { useHookstate } from '@hookstate/core';
import functions from '../functions/functions';

function OutputCard() {
  const selectedCipherType = useHookstate(states.cipherType);
  const selectedCipherMode = useHookstate(states.cipherMode);
  const key = useHookstate(states.key);
  const blockSize = useHookstate(states.blockSize);
  const text = useHookstate(states.text);
  const result = useHookstate(states.result);

  useEffect(() => {
    functions.compute();
  }, [selectedCipherType, selectedCipherMode, key, blockSize, text]);
  const type = useHookstate(states.cipherType.nested('value'));

  return (
    <Card
      style={{
        flex: 0.45,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography.Title level={4}>Output</Typography.Title>

      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title='Cipher Mode'
            value={selectedCipherMode.value.label || ' '}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Cipher Type'
            value={selectedCipherType.value.label || ' '}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        {type.get() === 'columnarTranspositionWithBlockSize' ? (
          <Col span={12}>
            <Statistic title='Block Size' value={blockSize.value || ' '} />
          </Col>
        ) : (
          <Col span={12}>
            <Statistic title='Key' value={key.value || ' '} />
          </Col>
        )}
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Statistic title='Text' value={text.value || ' '} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Statistic title='Result' value={result.value || ' '} />
        </Col>
      </Row>
    </Card>
  );
}

export default OutputCard;
