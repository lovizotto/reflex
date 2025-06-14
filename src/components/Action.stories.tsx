/**
 * Storybook stories for the Action component.
 * 
 * This file demonstrates various use cases of the Action component:
 * - Basic usage with a single watched value
 * - Watching multiple values simultaneously
 * - Using the immediate flag to trigger on mount
 * 
 * Each example shows how to integrate Action with other components like Signal.
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Action } from './Action';
import { createSignal } from '../core/createSignal';
import { Signal } from './Signal';

const meta = {
  title: 'Components/Action',
  component: Action,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Action>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic example of the Action component
 * 
 * This example demonstrates:
 * - Creating signals for state management (count and lastAction)
 * - Using the Action component to watch a single value (count)
 * - Updating another signal (lastAction) when the watched value changes
 * - Using the Signal component to display reactive values
 */
const ActionExample = () => {
  const [count, setCount] = createSignal(0);
  const [lastAction, setLastAction] = createSignal('None');

  return (
    <div
      style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
    >
      <h3>Action Component Example</h3>
      <Signal value={count}>{(value) => <p>Count: {value}</p>}</Signal>
      <Signal value={lastAction}>
        {(value) => <p>Last Action: {value}</p>}
      </Signal>

      <button onClick={() => setCount(count() + 1)}>Increment Count</button>

      <Action
        watch={() => count()}
        onTrigger={(value) => setLastAction(`Count changed to ${value}`)}
      />
    </div>
  );
};

/**
 * Example of the Action component with multiple watched values
 * 
 * This example demonstrates:
 * - Watching multiple signals simultaneously (count and name)
 * - Receiving an array of values in the onTrigger callback
 * - Maintaining a log of changes using a signal array
 * - Using the Signal component to create reactive UI elements
 */
const MultiWatchExample = () => {
  const [count, setCount] = createSignal(0);
  const [name, setName] = createSignal('');
  const [log, setLog] = createSignal<string[]>([]);

  const addLog = (message: string) => {
    setLog((prev) => [message, ...prev].slice(0, 5));
  };

  return (
    <div
      style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
    >
      <h3>Multiple Watch Example</h3>

      <div style={{ marginBottom: '10px' }}>
        <Signal value={count}>
          {(value) => (
            <button onClick={() => setCount(count() + 1)}>
              Count: {value}
            </button>
          )}
        </Signal>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <Signal value={name}>
          {(value) => (
            <input
              type="text"
              value={value}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          )}
        </Signal>
      </div>

      <div style={{ marginTop: '10px' }}>
        <h4>Action Log:</h4>
        <Signal value={log}>
          {(logEntries) => (
            <ul
              style={{
                maxHeight: '150px',
                overflow: 'auto',
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
              }}
            >
              {logEntries.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          )}
        </Signal>
      </div>

      <Action
        watch={[() => count(), () => name()]}
        onTrigger={(values) => {
          if (Array.isArray(values)) {
            addLog(`Values changed: Count=${values[0]}, Name="${values[1]}"`);
          }
        }}
      />
    </div>
  );
};

/**
 * Example of the Action component with the immediate flag
 * 
 * This example demonstrates:
 * - Using the immediate flag to trigger the callback when the component mounts
 * - Tracking changes to a count signal
 * - Maintaining a log of actions including the initial mount trigger
 * - Showing how the Action component integrates with user interactions
 */
const ImmediateActionExample = () => {
  const [count, setCount] = createSignal(0);
  const [logs, setLogs] = createSignal<string[]>(['Component mounted']);

  const addLog = (message: string) => {
    setLogs((prev) => [message, ...prev].slice(0, 5));
  };

  return (
    <div
      style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
    >
      <h3>Immediate Action Example</h3>
      <Signal value={count}>{(value) => <p>Count: {value}</p>}</Signal>

      <button
        onClick={() => {
          setCount(count() + 1);
          addLog(`Button clicked: count set to ${count()}`);
        }}
      >
        Increment Count
      </button>

      <div style={{ marginTop: '10px' }}>
        <h4>Logs:</h4>
        <Signal value={logs}>
          {(logEntries) => (
            <ul
              style={{
                maxHeight: '150px',
                overflow: 'auto',
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
              }}
            >
              {logEntries.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          )}
        </Signal>
      </div>

      <Action
        watch={() => count()}
        onTrigger={(value) => addLog(`Action triggered: count = ${value}`)}
        immediate={true}
      />
    </div>
  );
};

/**
 * Default story showcasing the basic usage of the Action component
 * with a single watched value.
 */
export const Default: Story = {
  render: () => <ActionExample />,
};

/**
 * Story demonstrating how to watch multiple values simultaneously
 * and handle an array of values in the onTrigger callback.
 */
export const MultipleWatches: Story = {
  render: () => <MultiWatchExample />,
};

/**
 * Story showcasing the immediate flag which triggers the callback
 * as soon as the component mounts, not just when values change.
 */
export const ImmediateAction: Story = {
  render: () => <ImmediateActionExample />,
};

/**
 * Story with comprehensive documentation about the Action component.
 * This includes detailed explanations, code examples, and usage guidelines.
 */
export const WithDescription: Story = {
  render: () => (
    <div>
      <ActionExample />
      <div style={{ height: '20px' }} />
      <MultiWatchExample />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
The Action component is a helper that watches for changes in values and triggers a callback when they change.

\`\`\`tsx
import { Action } from './components/Action';
import { createSignal } from '../core/createSignal';
import { Signal } from './Signal';

// Complete example of using Action with createSignal
const ActionExample = () => {
  // Create signals to manage state
  const [count, setCount] = createSignal(0);
  const [lastAction, setLastAction] = createSignal('None');

  return (
    <div>
      {/* Display the current count using Signal */}
      <Signal value={count}>
        {(value) => <p>Count: {value}</p>}
      </Signal>

      {/* Display the last action using Signal */}
      <Signal value={lastAction}>
        {(value) => <p>Last Action: {value}</p>}
      </Signal>

      {/* Button to increment count */}
      <button onClick={() => setCount(count() + 1)}>
        Increment Count
      </button>

      {/* Action component that watches for changes in count */}
      <Action 
        watch={() => count()}
        onTrigger={(value) => setLastAction(\`Count changed to \${value}\`)}
      />
    </div>
  );
};

// Example with multiple watches
const MultiWatchExample = () => {
  const [count, setCount] = createSignal(0);
  const [name, setName] = createSignal('');

  return (
    <div>
      <button onClick={() => setCount(count() + 1)}>
        Count: {count()}
      </button>

      <input 
        value={name()} 
        onChange={(e) => setName(e.target.value)} 
      />

      {/* Watch multiple values */}
      <Action 
        watch={[() => count(), () => name()]}
        onTrigger={(values) => {
          if (Array.isArray(values)) {
            console.log(\`Values changed: Count=\${values[0]}, Name="\${values[1]}"\`);
          }
        }}
      />
    </div>
  );
};

// Example with immediate flag
const ImmediateExample = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <Signal value={count}>
        {(value) => <p>Count: {value}</p>}
      </Signal>

      <button onClick={() => setCount(count() + 1)}>
        Increment Count
      </button>

      {/* Trigger immediately on mount */}
      <Action 
        watch={() => count()}
        onTrigger={(value) => console.log('Count value:', value)}
        immediate={true}
      />
    </div>
  );
};
\`\`\`

The Action component takes three props:
- \`watch\`: A function or array of functions that return values to watch
- \`onTrigger\`: A callback function that is called when the watched values change
- \`immediate\`: A boolean that determines whether the callback should be triggered immediately on mount (default: false)

The component:
- Watches for changes in the values returned by the watch function(s)
- Calls the onTrigger callback with the new value(s) when changes occur
- Can trigger the callback immediately on mount if immediate is true
- Returns null (renders nothing)
        `,
      },
    },
  },
};
