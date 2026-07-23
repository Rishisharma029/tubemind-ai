export interface SummaryVariant {
  short: string;
  medium: string;
  detailed: string;
  bullets: string[];
  beginner: string;
  expert: string;
}

export interface TimelineChapter {
  time: string;
  seconds: number;
  title: string;
  description: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  description?: string;
  children?: MindMapNode[];
}

export type QuizType = 'mcq' | 'true-false' | 'fill-blanks' | 'coding';

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: string;
  options?: string[]; // for mcq
  answer: string; // for all (correct index/text)
  explanation: string;
  codeSnippet?: string; // for coding/mcq
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  bookmarked?: boolean;
}

export interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
}

export interface ResourceLink {
  title: string;
  category: 'github' | 'docs' | 'paper' | 'book' | 'course';
  url: string;
  description: string;
}

export interface VideoAnalysis {
  id: string;
  url: string;
  title: string;
  duration: string;
  channel: string;
  views: string;
  publishDate: string;
  thumbnail: string;
  summary: SummaryVariant;
  notes: string;
  timeline: TimelineChapter[];
  mindMap: MindMapNode;
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
  blog: {
    title: string;
    content: string;
    seoScore: number;
    keywords: string[];
    readTime: string;
  };
  linkedin: {
    professional: string;
    funny: string;
    startup: string;
    developer: string;
  };
  twitter: string[];
  codeSnippets: CodeSnippet[];
  resources: ResourceLink[];
}

export const PRESET_VIDEOS: Record<string, VideoAnalysis> = {
  "karpathy-nn": {
    id: "karpathy-nn",
    url: "https://www.youtube.com/watch?v=VMj-3S1tku0",
    title: "The spelled-out intro to neural networks and backpropagation: building micrograd",
    duration: "2:24:13",
    channel: "Andrej Karpathy",
    views: "4.1M views",
    publishDate: "2 years ago",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    summary: {
      short: "A complete walkthrough of building micrograd, a tiny scalar-valued autograd engine, explaining neural networks, derivatives, backpropagation, and training loops from first principles.",
      medium: "In this classic educational video, Andrej Karpathy explains how neural networks work by building a Python autograd engine called micrograd from scratch. He covers the mathematical meaning of derivatives, uses them to write backpropagation step-by-step, builds a multilayer perceptron, and trains it to classify data points, demonstrating that modern deep learning is simply backpropagation applied to computational graphs.",
      detailed: "This lecture is the ultimate guide to understanding neural networks from first principles. Karpathy starts by introducing derivatives and what they represent geometrically and mathematically. He then builds a `Value` class in Python, which wraps scalar numbers and implements basic operations (addition, multiplication, power, etc.) while building a computational graph dynamically. Each `Value` object keeps track of its inputs and local derivative function. He then implements backpropagation recursively to calculate the gradients of all nodes in the graph with respect to a final output. Using this autograd engine, Karpathy constructs a neuron, a layer of neurons, and a Multi-Layer Perceptron (MLP). Finally, he defines a loss function, calculates the loss on a toy dataset, runs backpropagation, and performs gradient descent to successfully train the MLP, showing that the entire process of training neural networks is simply gradient descent guided by automatic differentiation.",
      bullets: [
        "First-principles derivation of computational graphs and automatic differentiation.",
        "Step-by-step construction of `Value` object in Python supporting addition, multiplication, and power.",
        "Manual calculation of gradients for complex expressions to build intuition.",
        "Implementation of recursive topological sort to automate backward pass.",
        "Building a neuron, layer, and Multi-Layer Perceptron (MLP) abstractions.",
        "Explanation of loss functions, zeroing gradients, and optimization step in training loops."
      ],
      beginner: "If you know basic algebra and a little Python, this video is for you. Think of a neural network as a giant calculator. You give it numbers (inputs) and it gives you answers (outputs). To make it learn, we must tweak its interior knobs (weights). The video shows you exactly how to calculate how much to turn each knob so the calculator gets the correct answer next time. You build the whole system step-by-step.",
      expert: "Karpathy builds a scalar-valued automatic differentiation engine (`micrograd`) implementing reverse-mode autograd. The computational graph is represented as DAG of `Value` nodes, where each node stores its scalar data, gradient, references to parent nodes, and a backward function. Dynamic topological sorting ensures that parents are evaluated before children in the backward pass. He highlights numerical stability issues (like division by zero) and demonstrates how optimization loops converge on complex decision boundaries."
    },
    notes: `# Andrej Karpathy's Micrograd: Deep Dive into Backpropagation

## 1. Core Mathematical Concept: Derivatives
A derivative measures the rate of change of a function with respect to a variable. Geometrically, it is the slope of the tangent line to the graph of the function at a given point.

$$\\frac{df(x)}{dx} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$

If we perturb $x$ by a tiny value $h$, the output of $f(x)$ will change by $h \\cdot f'(x)$.

## 2. Building the Autograd Engine
To automate gradient computation, we build a \`Value\` class in Python. It stores:
1. The scalar value (\`data\`)
2. The gradient (\`grad\`), initialized to \`0.0\`
3. The parents/creators of the node (\`_prev\`)
4. The operation that generated this node (\`_op\`)
5. A backward function (\`_backward\`) which calculates local gradients.

\`\`\`python
class Value:
    def __init__(self, data, _children=(), _op=''):
        self.data = data
        self.grad = 0.0
        self._prev = set(_children)
        self._op = _op
        self._backward = lambda: None

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other), '+')
        
        def _backward():
            self.grad += out.grad
            other.grad += out.grad
        out._backward = _backward
        return out
\`\`\`

## 3. Backpropagation through a DAG
Backpropagation flows from the output backward. To calculate gradients in the correct order, we must run a **topological sort** on the graph. A node can only calculate its gradient after all its descendants have processed theirs.

> **Key Takeaway:** The chain rule states that to find the gradient of the loss with respect to a weight, we multiply the local gradient of the operation by the incoming gradient from the parent.
`,
    timeline: [
      { time: "0:00:00", seconds: 0, title: "Introduction", description: "Overview of micrograd and deep learning concepts." },
      { time: "0:04:12", seconds: 252, title: "The Derivative", description: "Intuitive explanation of derivatives and limit definition." },
      { time: "0:25:30", seconds: 1530, title: "Value class and DAGs", description: "Creating the basic Python class to represent node values in a computational graph." },
      { time: "0:55:00", seconds: 3300, title: "Manual Backpropagation", description: "Tracing gradients manually through a simple mathematical formula." },
      { time: "1:22:15", seconds: 4935, title: "Implementing Autograd", description: "Writing the topological sort and recursive backprop pass in Python." },
      { time: "1:50:40", seconds: 6640, title: "Building a Multi-layer Perceptron", description: "Scaling up from scalar Values to Neurons, Layers, and multi-layer networks." },
      { time: "2:10:00", seconds: 7800, title: "Training Loop & Loss Function", description: "Defining MSE loss, running gradient descent steps, and witnessing the MLP learn." }
    ],
    mindMap: {
      id: "nn-root",
      label: "Neural Networks & Autograd",
      description: "Fundamental concepts of computational graphs and backprop",
      children: [
        {
          id: "nn-deriv",
          label: "Derivatives",
          description: "Rate of change of functions",
          children: [
            { id: "nn-limit", label: "Limit Definition", description: "h -> 0 formula" },
            { id: "nn-chain", label: "Chain Rule", description: "d(f(g(x)))/dx = f'(g(x)) * g'(x)" }
          ]
        },
        {
          id: "nn-micrograd",
          label: "Micrograd autograd engine",
          description: "Python scalar implementation",
          children: [
            { id: "nn-value", label: "Value Wrapper", description: "Holds data, grad, operations" },
            { id: "nn-topsort", label: "Topological Sort", description: "Correct ordering of backward passes" },
            { id: "nn-backprop", label: "Backpropagation", description: "Reverse accumulation of gradients" }
          ]
        },
        {
          id: "nn-mlp",
          label: "Multilayer Perceptron",
          description: "Full neural network model",
          children: [
            { id: "nn-neuron", label: "Neuron Model", description: "Inputs, weights, bias, activation" },
            { id: "nn-loss", label: "Loss Optimization", description: "MSE loss and step gradient descent" }
          ]
        }
      ]
    },
    quiz: [
      {
        id: "karpathy-q1",
        type: "mcq",
        question: "Why do we need a topological sort before running the backward pass of backpropagation?",
        options: [
          "To speed up computational complexity from O(N) to O(log N).",
          "To ensure that each node calculates its gradient only after all of its downstream dependencies have already computed theirs.",
          "To format the output layers in chronological order.",
          "To check if the computational graph has closed cycles."
        ],
        answer: "1",
        explanation: "Since backpropagation works in reverse-mode, the gradient of a child node depends on the gradients of its parent nodes. Topological sorting ensures we process parent nodes before child nodes, avoiding incorrect accumulation of gradients."
      },
      {
        id: "karpathy-q2",
        type: "true-false",
        question: "In backpropagation, if the gradient of the loss with respect to Value a is +2.0, and b = a + c, then the gradient of the loss with respect to b is also +2.0.",
        answer: "true",
        explanation: "The addition operator simply passes the incoming gradient directly to both of its inputs, because local derivative of a + c with respect to a or c is 1."
      },
      {
        id: "karpathy-q3",
        type: "fill-blanks",
        question: "The process of calculating derivatives automatically by traversing a computational graph in reverse is called _______-mode automatic differentiation.",
        answer: "reverse",
        explanation: "Reverse-mode autodiff evaluates gradients by moving backwards from the output (loss) to the inputs, which is highly efficient for neural networks with millions of parameters."
      },
      {
        id: "karpathy-q4",
        type: "coding",
        question: "Implement the backward operation for a multiplication Value node (self * other) in python.",
        codeSnippet: `def __mul__(self, other):
    other = other if isinstance(other, Value) else Value(other)
    out = Value(self.data * other.data, (self, other), '*')
    
    def _backward():
        # Complete this function: calculate gradients of self and other
        pass
        
    out._backward = _backward
    return out`,
        answer: "self.grad += other.data * out.grad\nother.grad += self.data * out.grad",
        explanation: "Using the product rule, the derivative of (u * v) with respect to u is v, and with respect to v is u. Multiplying by the incoming gradient (out.grad) gives the backpropagated updates."
      }
    ],
    flashcards: [
      { id: "k-f1", front: "What is Backpropagation?", back: "An algorithm for calculating gradients of a loss function with respect to weights by recursively applying the chain rule from output back to inputs.", category: "Math", difficulty: "medium" },
      { id: "k-f2", front: "What does the grad parameter store in Value?", back: "The derivative of the final output (usually the loss) with respect to that specific node's value.", category: "Implementation", difficulty: "easy" },
      { id: "k-f3", front: "Explain how gradient descent updates a weight w.", back: "w = w - (learning_rate * w.grad). We subtract a fraction of the gradient to move in the direction of steepest descent.", category: "Training", difficulty: "easy" },
      { id: "k-f4", front: "What is micrograd?", back: "A tiny scalar autograd engine built by Karpathy containing about 100 lines of python code that supports full training of multi-layer perceptrons.", category: "Overview", difficulty: "medium" }
    ],
    blog: {
      title: "Building Deep Learning from Scratch: Demystifying Backpropagation",
      content: `### Demystifying Backpropagation and Computational Graphs
Neural networks are often labeled as 'black boxes'. In this article, inspired by Andrej Karpathy's masterclass on backpropagation, we unpack this mystery. We will build a tiny autograd engine from first principles.

#### 1. What is a Computational Graph?
A computational graph is a directed acyclic graph (DAG) where nodes represent values and edges represent operations (like addition, multiplication, or tanh activation). By tracking operations, we can compute exact gradients automatically.

#### 2. The Chain Rule: The Engine of Autograd
To compute the derivative of a loss function $L$ with respect to a weight $w$, we utilize the chain rule:

$$\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial y} \\cdot \\frac{\\partial y}{\\partial w}$$

This simple product allows gradients to flow backwards smoothly.

#### 3. Why Build Your Own?
Frameworks like PyTorch and TensorFlow abstract these details. However, writing a scalar version like \`micrograd\` exposes the elegant simplicity of modern AI: everything is just derivatives, graphs, and SGD.`,
      seoScore: 92,
      keywords: ["Backpropagation", "Neural Networks", "Micrograd", "Autograd", "Karpathy", "Deep Learning"],
      readTime: "6 min read"
    },
    linkedin: {
      professional: "💡 Backpropagation is the engine of all modern AI. If you want to truly master neural networks, you have to build them from first principles.\n\nI just finished studying Andrej Karpathy's micrograd architecture. It's beautiful how ~100 lines of Python code can represent the full autograd framework powering LLMs.\n\nKey lesson: Don't just import libraries. Understand the graphs.",
      funny: "Me: 'I build advanced deep learning architectures.'\nKarpathy: *Builds micrograd from scratch, explaining derivatives using high school math and Python set structures in 2 hours.*\nMe: *Quietly deletes 'Expert' from PyTorch on resume*",
      startup: "How to build a $100B tech foundation: start with scalars. Andrej Karpathy shows that deep learning isn't magic, it's just chain-rule derivatives on a directed graph. At TubeMind AI, we help you master complex subjects by breaking videos down into micro-lessons. Build your knowledge graph from the ground up! 🚀",
      developer: "Autograd from scratch in Python:\n\n1. Wrap numbers in a Value class.\n2. Record operands + ops in a set.\n3. Define backward functions on operators.\n4. Run topological sort.\n5. Subtract grad * lr. \n\nNo torch. No tensorflow. Pure engineering."
    },
    twitter: [
      "1/ Neural networks are often treated as black boxes. But they're just calculators. Today, let's break down how backpropagation actually works from first principles 🧵",
      "2/ A derivative is simply the rate of change. If we change input x by a tiny 'h', how much does output y move? We use this to compute gradients.",
      "3/ In python, we wrap floats in a Value object. Value stores the data, the operation that created it, and its gradient (how much the loss moves if the value moves).",
      "4/ When we run a forward pass, we build a Graph (DAG). To flow gradients back, we topological sort this DAG, running each node's local backward function in reverse order.",
      "5/ The result? We find exactly how to tweak every weight in a network to reduce loss. Check out micrograd by Karpathy for the ultimate intro to this beauty!"
    ],
    codeSnippets: [
      {
        id: "k-c1",
        title: "Value Class Boilerplate",
        language: "python",
        code: `class Value:
    def __init__(self, data, _children=(), _op=''):
        self.data = data
        self.grad = 0.0
        self._prev = set(_children)
        self._op = _op
        self._backward = lambda: None

    def __repr__(self):
        return f"Value(data={self.data}, grad={self.grad})"`,
        description: "The core wrapper class containing the scalar data and gradient tracking."
      },
      {
        id: "k-c2",
        title: "Topological Sort & Backward Pass",
        language: "python",
        code: `def backward(self):
    topo = []
    visited = set()
    def build_topo(v):
        if v not in visited:
            visited.add(v)
            for child in v._prev:
                build_topo(child)
            topo.append(v)
    build_topo(self)
    
    self.grad = 1.0
    for node in reversed(topo):
        node._backward()`,
        description: "Sorts the DAG nodes topologically so that reverse accumulation calculates gradients in correct dependency order."
      }
    ],
    resources: [
      { title: "micrograd GitHub Repository", category: "github", url: "https://github.com/karpathy/micrograd", description: "Official source code for Andrej Karpathy's micrograd autograd engine." },
      { title: "Calculus on Computational Graphs", category: "docs", url: "https://colah.github.io/posts/2015-08-Backprop/", description: "Christopher Olah's highly visual post explaining backpropagation." },
      { title: "Automatic Differentiation in Machine Learning", category: "paper", url: "https://arxiv.org/abs/1502.05767", description: "A comprehensive academic survey paper detailing autograd principles." }
    ]
  },
  "next15-course": {
    id: "next15-course",
    url: "https://www.youtube.com/watch?v=Next15Course",
    title: "Next.js 15 App Router & Server Components Crash Course",
    duration: "1:05:30",
    channel: "Vercel Devs",
    views: "520K views",
    publishDate: "1 month ago",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    summary: {
      short: "A comprehensive guide to Next.js 15 features including React 19 server components, partial pre-rendering, cache updates, and compiler setups.",
      medium: "This crash course goes deep into Next.js 15. Learn how React Server Components (RSC) handle hydration, explore server actions for data mutations, structure forms with React 19's useActionState, implement partial pre-rendering (PPR), and configure the Next.js Compiler for faster local builds.",
      detailed: "Next.js 15 represents a massive milestone, integrating React 19 features natively. This video shows how dynamic caching has changed: caching is now 'off' by default for fetch requests, GET handlers, and client-side navigations, making apps more real-time without constant caching bugs. The instructor covers partial pre-rendering (PPR), showing how static shells are loaded instantly while dynamic regions stream in parallel. You will learn to use server actions securely, validation using Zod schemas, and client toast updates with Sonner. Finally, the new Async Request APIs (like headers, cookies, params, searchParams) are introduced as asynchronous promises that must be awaited in server components.",
      bullets: [
        "React Server Components (RSC) and standard Client Components distinction.",
        "Dynamic Caching defaults change: dynamic queries are now uncached by default.",
        "React 19 Hooks: useActionState, useFormStatus, and useOptimistic.",
        "Partial Pre-rendering (PPR) configuration using experimental flags.",
        "Async Request API migration (awaiting params, headers, and cookies)."
      ],
      beginner: "Want to build ultra-fast websites? Next.js 15 is the latest framework for that. This video shows you how to write code that runs directly on the computer serving the website (Server Components), making your pages load instantly for visitors. We show how to load data and build interactive forms with simple steps.",
      expert: "Deep dive into hydration boundaries and partial pre-rendering. Next.js 15 updates the routing layer where Server-Side Parameters (params, searchParams) are asynchronous. We analyze how streaming hooks bypass hydration blockages, and how server actions execute POST requests in the background with automatic router cache revalidation."
    },
    notes: `# Next.js 15 & React 19 Masterclass

## 1. Async Request APIs
In Next.js 15, request-specific APIs are asynchronous. You must await \`params\`, \`searchParams\`, \`cookies\`, and \`headers\` in server pages.

\`\`\`tsx
type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  return <div>Post ID: {id}</div>;
}
\`\`\`

## 2. Dynamic Caching Defaults
- **Fetch Requests:** No longer cached by default (\`cache: 'no-store'\`).
- **Route Handlers:** GET requests are dynamic and uncached by default.
- **Client Router Cache:** Cache time is 0 for dynamic pages, enforcing re-fetching on back/forward navigations.

## 3. Server Actions & React 19 Form Hooks
Use \`useActionState\` for executing server action mutations with automatic pending states.
`,
    timeline: [
      { time: "0:00:00", seconds: 0, title: "Overview of Next.js 15", description: "What's new in Next.js 15 and React 19 integration." },
      { time: "0:08:20", seconds: 500, title: "Async Request APIs", description: "Why parameters, search parameters, and cookies are now async." },
      { time: "0:20:45", seconds: 1245, title: "RSC Caching Updates", description: "Understanding the shift from cached-by-default to dynamic-by-default." },
      { time: "0:35:10", seconds: 2110, title: "Server Actions and forms", description: "Building data mutations with React 19 useActionState hook." },
      { time: "0:52:00", seconds: 3120, title: "Partial Pre-rendering", description: "How PPR combines static shells with dynamic streaming blocks." }
    ],
    mindMap: {
      id: "next-root",
      label: "Next.js 15 Framework",
      description: "App router and React 19 features",
      children: [
        {
          id: "next-routing",
          label: "Routing & Rendering",
          children: [
            { id: "next-async", label: "Async APIs", description: "Awaiting params & cookies" },
            { id: "next-ppr", label: "PPR", description: "Static Shell + Dynamic Stream" }
          ]
        },
        {
          id: "next-data",
          label: "Data Mutation",
          children: [
            { id: "next-actions", label: "Server Actions", description: "Direct server invocations" },
            { id: "next-actionstate", label: "useActionState", description: "Form actions state handler" }
          ]
        },
        {
          id: "next-caching",
          label: "Caching Changes",
          children: [
            { id: "next-uncached", label: "Dynamic Caching", description: "Fetch defaults to no-store" }
          ]
        }
      ]
    },
    quiz: [
      {
        id: "next-q1",
        type: "mcq",
        question: "Which of the following request APIs is now asynchronous in Next.js 15?",
        options: [
          "useRouter()",
          "cookies()",
          "usePathname()",
          "Image component loader"
        ],
        answer: "1",
        explanation: "In Next.js 15, cookies(), headers(), and dynamic parameters are asynchronous. You must await them before reading properties."
      },
      {
        id: "next-q2",
        type: "true-false",
        question: "By default, fetch requests in Next.js 15 are cached permanently unless specified otherwise.",
        answer: "false",
        explanation: "Unlike Next.js 13/14, Next.js 15 sets the default caching behavior of fetch to 'no-store', making dynamic data loading the default."
      },
      {
        id: "next-q3",
        type: "fill-blanks",
        question: "To combine static page elements with dynamic streaming content in Next.js, we use Partial _______ Rendering.",
        answer: "Pre",
        explanation: "Partial Pre-rendering (PPR) generates a static shell instantly while streaming dynamic sections in the same request, combining SSG and SSR advantages."
      }
    ],
    flashcards: [
      { id: "n-f1", front: "What is React Server Components (RSC)?", back: "Components that execute only on the server, sending zero client-side JavaScript, which increases page load speeds.", category: "Architecture", difficulty: "easy" },
      { id: "n-f2", front: "Explain useActionState.", back: "A React 19 hook that wraps a function that performs action mutations, returning the action's result state and a pending boolean.", category: "Form Validation", difficulty: "medium" },
      { id: "n-f3", front: "What is Turbopack?", back: "An incremental bundler written in Rust, optimized for speed, which replaces Webpack for dev server tasks.", category: "Build Tools", difficulty: "medium" }
    ],
    blog: {
      title: "Migrating to Next.js 15: Caching, Async APIs, and React 19",
      content: `### The Next.js 15 Paradigm Shift
Next.js 15 changes defaults to reduce common cache issues. If you have been writing Next.js 13 or 14 apps, here is what you need to know.

#### 1. Uncached by Default
The most requested change in Next.js was to disable fetch caching. Next.js 15 implements this request:
- \`fetch()\` is uncached.
- Route Handlers default to dynamic.
- Client router caches are active only during browser navigation.

#### 2. Async Params in Route Pages
Dynamic parameter inputs must now be awaited. This allows Vercel to optimize request-scoped operations and layouts efficiently.

#### 3. How to adopt PPR
Partial Pre-rendering (PPR) is the future. It generates static layouts during build and streams dynamic segments upon load, providing loading skeleton UI seamlessly.`,
      seoScore: 95,
      keywords: ["Next.js 15", "React 19", "App Router", "Caching", "Vercel", "Web Dev"],
      readTime: "4 min read"
    },
    linkedin: {
      professional: "🚀 Next.js 15 and React 19 represent a major shift in web architecture. Dynamic caching is now off by default, cookies are async, and Partial Pre-rendering (PPR) is production-ready. We are using these technologies at TubeMind AI to build speed-of-light learning tools.",
      funny: "Next.js 13: Cache everything! Forever!\nNext.js 14: Cache it, but maybe purge it sometimes?\nNext.js 15: Caching? Never heard of her. Dynamic by default, please.",
      startup: "Vercel just raised the bar with Next.js 15. The loading performance gains from Partial Pre-rendering are immense. Build rich AI dashboards without latency. The era of static shell + streamed widgets is here.",
      developer: "Next.js 15 async parameter update cheatsheet:\n\n// Old\nexport default function Page({ params }) {\n  return <div>{params.slug}</div>;\n}\n\n// New\nexport default async function Page({ params }) {\n  const { slug } = await params;\n  return <div>{slug}</div>;\n}"
    },
    twitter: [
      "1/ Next.js 15 is out, and it's full of architectural updates. Let's cover the 3 biggest changes you need to know to migrate your apps 🧵",
      "2/ Caching defaults are flipped. fetch() requests are now 'no-store' by default. No more constant 'npm run build' caching bugs during local testing!",
      "3/ Dynamic parameters are async. cookies(), headers(), params, searchParams must be awaited. This prepares Next.js for future async hydration models.",
      "4/ Partial Pre-rendering (PPR) is now customizable. You can serve static layouts instantly while loading slow dynamic pieces in parallel via Suspense streams.",
      "5/ In short: Next.js 15 is faster, more predictable, and cleaner. Highly recommend migrating today!"
    ],
    codeSnippets: [
      {
        id: "n-c1",
        title: "Async Parameters Page",
        language: "typescript",
        code: `interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  
  return (
    <div className="p-6">
      <h1>Slug: {slug}</h1>
      <p>Filter: {query.filter}</p>
    </div>
  );
}`,
        description: "Standard Next.js 15 async page component structure matching new router types."
      }
    ],
    resources: [
      { title: "Next.js 15 Official Release Blog", category: "docs", url: "https://nextjs.org/blog/next-15", description: "Detailed changes and migration guidelines from Vercel team." },
      { title: "React 19 Upgrade Guide", category: "docs", url: "https://react.dev/blog/2024/04/25/react-19-upgrade-guide", description: "Official React documentation for React 19 features." }
    ]
  }
};

// Generates a dynamic video analysis based on URL and fetched YouTube metadata
export function generateDynamicMock(
  url: string,
  metadata?: { title?: string; channel?: string; thumbnail?: string }
): VideoAnalysis {
  let videoId = "dynamic-id";
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com")) {
      videoId = urlObj.searchParams.get("v") || "dynamic-id";
    } else if (urlObj.hostname.includes("youtu.be")) {
      videoId = urlObj.pathname.slice(1).split("?")[0] || "dynamic-id";
    }
  } catch (e) {
    // ignore
  }

  const rawTitle = metadata?.title || `AI Video Analysis: ${videoId}`;
  const cleanTitle = rawTitle
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/#\w+/g, '')
    .trim() || rawTitle;

  const channel = metadata?.channel || "YouTube Creator";
  const thumbnail = metadata?.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const lowerTitle = rawTitle.toLowerCase();

  // Detect domain
  const isMath = /math|bca|calculus|algebra|geometry|matrix|determinant|exam|syllabus|degree|college|trigonometry|derivatives/.test(lowerTitle);
  const isCoding = /code|coding|react|javascript|typescript|python|java|c\+\+|next|node|web|dev|software|programming|api|css|html/.test(lowerTitle);
  const isAI = /ai|ml|machine learning|deep learning|neural|llm|gpt|transformer|data science/.test(lowerTitle);

  if (isMath) {
    return {
      id: videoId,
      url,
      title: rawTitle,
      duration: "18:45",
      channel,
      views: "24.5K views",
      publishDate: "Recently Analyzed",
      thumbnail,
      summary: {
        short: `High-yield mathematics lecture notes and exam preparation guide for "${cleanTitle}".`,
        medium: `This lecture provides a comprehensive breakdown of key mathematical concepts, formulas, matrix operations, differential calculus, and step-by-step exam problem-solving techniques for ${cleanTitle}.`,
        detailed: `In this synthesis of "${rawTitle}", we cover Linear Algebra (Matrices & Determinants), Differential & Integral Calculus, Discrete Mathematics, and strategic paper solving methods required for university semester exams.`,
        bullets: [
          "Complete breakdown of core mathematical formulas and matrix operations.",
          "Cramer's Rule and matrix inverses for linear systems.",
          "Limits, continuity, and Leibniz's successive differentiation rule.",
          "Exam strategy, high-weightage topics, and past-year paper practice tips."
        ],
        beginner: "This guide breaks down complex math formulas into simple step-by-step explanations with practice quizzes and revision flashcards.",
        expert: "In-depth treatment of matrix ranks, determinant identities, indeterminate limits via L'Hopital's rule, and discrete logic truth tables."
      },
      notes: `# 📚 Study Notes: ${cleanTitle}

**Source Video:** [${rawTitle}](${url})  
**Channel / Creator:** ${channel}

---

## 🎯 Executive Overview & Exam Blueprint
This lecture covers essential foundational concepts in university mathematics, focusing on problem-solving techniques, formula derivations, and high-yield exam strategy.

---

## 🔑 Core Technical Modules

### 1. Linear Algebra: Matrices & Determinants
- **Matrix Operations:** Addition, scalar multiplication, matrix multiplication ($A \\cdot B$), and transpose ($A^T$).
- **Determinants ($\det(A)$):** Scalar value computed for square matrices. $\det(A^T) = \det(A)$ and $\det(AB) = \det(A)\det(B)$.
- **Cramer's Rule:** Method to solve system of linear equations $AX = B$:
  $$x_i = \\frac{\det(A_i)}{\det(A)} \\quad (\\text{where } \det(A) \\neq 0)$$
- **Inverse Matrix ($A^{-1}$):** $A^{-1} = \\frac{1}{\det(A)} \\text{adj}(A) (Valid only if $\det(A) \\neq 0)$.

### 2. Differential & Integral Calculus
- **Limits & Continuity:** Solving indeterminate forms $\\frac{0}{0}$ or $\\frac{\infty}{\infty}$ using L'Hôpital's Rule.
- **Successive Differentiation:** Applying Leibniz's Theorem for finding $n$-th derivatives of product functions:
  $$(uv)_n = u_n v + \\binom{n}{1} u_{n-1} v_1 + \\binom{n}{2} u_{n-2} v_2 + \\dots + u v_n$$
- **Integral Calculus:** Definite integration, reduction formulas, and calculating bounded areas.

### 3. Discrete Mathematics & Set Logic
- **Set Operations:** Union ($\cup$), Intersection ($\cap$), Difference ($A \\setminus B$), and Cartesian Product ($A \\times B$).
- **Truth Tables:** Logical implications ($P \\rightarrow Q \\equiv \\neg P \\vee Q$) and proving tautologies.

---

## 💡 High-Yield Exam Preparation Strategy
1. **Focus on Past 5-Year Papers:** Over 70% of exam question formats repeat.
2. **Formula Memory Sheet:** Keep a dedicated sheet for matrix properties, derivative identities, and standard integrals.
3. **Step-by-Step Layout:** Show all intermediate matrix determinant operations to secure partial marks.
`,
      timeline: [
        { time: "00:00", seconds: 0, title: "Syllabus Weightage & Exam Pattern", description: "Overview of key chapters, question formats, and scoring strategy." },
        { time: "03:15", seconds: 195, title: "Matrices, Determinants & Cramer's Rule", description: "Solving systems of linear equations and calculating matrix inverses." },
        { time: "08:40", seconds: 520, title: "Differential Calculus & Leibniz Theorem", description: "Evaluating limits, L'Hopital's rule, and n-th derivative formulas." },
        { time: "13:20", seconds: 800, title: "Integral Calculus & Definite Integrals", description: "Methods of integration, reduction formulas, and area applications." },
        { time: "16:50", seconds: 1010, title: "Discrete Math & Exam Solving Tips", description: "Truth tables, set theory principles, and final paper strategy." }
      ],
      mindMap: {
        id: "math-root",
        label: cleanTitle.slice(0, 25),
        description: "Mathematics & Exam Prep",
        children: [
          {
            id: "m-algebra",
            label: "Linear Algebra",
            description: "Matrices & Determinants",
            children: [
              { id: "m-cramer", label: "Cramer's Rule", description: "System of linear equations" },
              { id: "m-inverse", label: "Matrix Inverse", description: "Adjoint method" }
            ]
          },
          {
            id: "m-calculus",
            label: "Calculus",
            description: "Differential & Integral",
            children: [
              { id: "m-limits", label: "Limits & L'Hopital", description: "Indeterminate forms" },
              { id: "m-integrals", label: "Definite Integrals", description: "Area under curves" }
            ]
          },
          {
            id: "m-discrete",
            label: "Discrete Math",
            description: "Logic & Sets",
            children: [
              { id: "m-logic", label: "Truth Tables", description: "Tautologies & Proofs" }
            ]
          }
        ]
      },
      quiz: [
        {
          id: "m-q1",
          type: "mcq",
          question: "What is the determinant of an Identity matrix I of size n x n?",
          options: ["0", "1", "n", "Undefined"],
          answer: "1",
          explanation: "The determinant of any identity matrix I_n is always equal to 1 because all diagonal elements are 1 and off-diagonals are 0."
        },
        {
          id: "m-q2",
          type: "mcq",
          question: "Which formula is used to calculate the n-th derivative of a product of two functions u(x) and v(x)?",
          options: ["Cramer's Rule", "Leibniz's Theorem", "Taylor's Series", "L'Hôpital's Rule"],
          answer: "1",
          explanation: "Leibniz's Theorem generalizes the product rule to compute higher order n-th derivatives of product functions."
        },
        {
          id: "m-q3",
          type: "true-false",
          question: "A square matrix A has an inverse (A^-1) if and only if its determinant is non-zero (det(A) ≠ 0).",
          answer: "true",
          explanation: "True! Non-singular matrices (det(A) ≠ 0) are invertible."
        }
      ],
      flashcards: [
        { id: "m-f1", front: "What is Cramer's Rule?", back: "An explicit formula for solving a system of linear equations using matrix determinants.", category: "Linear Algebra", difficulty: "easy" },
        { id: "m-f2", front: "What is a Singular Matrix?", back: "A square matrix whose determinant is 0, meaning it does NOT have a matrix inverse.", category: "Linear Algebra", difficulty: "medium" },
        { id: "m-f3", front: "What is L'Hôpital's Rule?", back: "A calculus rule evaluating indeterminate limits (0/0 or ∞/∞) using derivatives.", category: "Calculus", difficulty: "medium" }
      ],
      blog: {
        title: `Mastering ${cleanTitle}: Complete Exam Study Guide`,
        content: `### Overview\n\nMathematics exams require combining conceptual understanding with rigorous step-by-step practice. This guide synthesizes key points from **"${rawTitle}"**.\n\n### Key Highlights\n- **Matrices & Determinants:** Solving equations with Cramer's Rule.\n- **Calculus Mastery:** Evaluating limits and n-th derivatives.\n- **Exam Strategy:** Effective paper management for maximum marks.\n\n*Generated by TubeMind AI.*`,
        seoScore: 94,
        keywords: ["BCA Math", "Exam Preparation", "Calculus Notes", "Linear Algebra"],
        readTime: "3 min read"
      },
      linkedin: {
        professional: `Just synthesized "${cleanTitle}" using TubeMind AI! Turned this lecture into interactive notes, formula flashcards, and practice quizzes in seconds. Perfect for exam prep! 🚀`,
        funny: `Math exam next week? Spent 0 minutes stressing and 2 minutes letting AI structure my calculus notes. 🤓✨`,
        startup: `Active recall and interactive flashcards accelerate complex subject learning. TubeMind AI makes study sessions seamless.`,
        developer: `Parsed linear algebra formulas & logic tables into structured markdown & quiz components.`
      },
      twitter: [
        `1/ Synthesized exam study notes for "${cleanTitle.slice(0, 40)}..." with TubeMind AI! Here is a thread of key formulas 🧵`,
        `2/ Linear Algebra Tip: Always check det(A) ≠ 0 before calculating matrix inverses.`,
        `3/ Calculus Tip: Apply L'Hôpital's Rule whenever encountering indeterminate 0/0 limits.`,
        `4/ Test your knowledge with interactive flashcards and quizzes directly in the TubeMind AI dashboard!`
      ],
      codeSnippets: [
        {
          id: "m-code-1",
          title: "Python Matrix Determinant & System Solver (NumPy)",
          language: "python",
          code: `import numpy as np

# System of Equations: 2x + y = 5, 3x + 4y = 10
A = np.array([[2, 1], [3, 4]])
B = np.array([5, 10])

# Compute Determinant
det_A = np.linalg.det(A)
print(f"Determinant det(A): {det_A:.2f}")

# Solve system X = [x, y]
X = np.linalg.solve(A, B)
print(f"Solution [x, y]: {X}")`,
          description: "Python code demonstrating matrix inverse and linear equation solving."
        }
      ],
      resources: [
        { title: "Khan Academy Linear Algebra", category: "course", url: "https://www.khanacademy.org/math/linear-algebra", description: "Interactive tutorials on matrices and linear transformations." },
        { title: "GeeksforGeeks Engineering Mathematics", category: "docs", url: "https://www.geeksforgeeks.org/engineering-mathematics-tutorials/", description: "Comprehensive notes and solved practice questions." }
      ]
    };
  }

  if (isCoding || isAI) {
    return {
      id: videoId,
      url,
      title: rawTitle,
      duration: "24:10",
      channel,
      views: "42.1K views",
      publishDate: "Recently Analyzed",
      thumbnail,
      summary: {
        short: `Technical breakdown and developer notes for "${cleanTitle}".`,
        medium: `This tutorial provides an in-depth walkthrough of software architecture, key code patterns, implementation steps, and best practices for ${cleanTitle}.`,
        detailed: `In this AI analysis of "${rawTitle}", we cover architecture design, code implementations, debugging strategies, performance optimizations, and production deployment patterns.`,
        bullets: [
          "Core software design principles and architectural overview.",
          "Step-by-step code implementation with explanations.",
          "Performance optimization techniques and common pitfalls.",
          "Key developer takeaways and production deployment checklist."
        ],
        beginner: "A clear step-by-step breakdown of the software concepts discussed in the video with runnable code examples.",
        expert: "Deep technical analysis covering API design, memory management, and code execution flow."
      },
      notes: `# 💻 Technical Notes: ${cleanTitle}

**Source Video:** [${rawTitle}](${url})  
**Channel:** ${channel}

---

## 🚀 Overview & Architecture
This lecture explores technical implementation strategies, code design patterns, and optimization techniques.

---

## 🔑 Key Engineering Concepts

### 1. System Design & Core Architecture
- Modular component organization and clean separation of concerns.
- State management and efficient data flow patterns.
- Async operation handling and error boundaries.

### 2. Code Implementation Highlights
- Modern syntax patterns and type safety best practices.
- Refactoring legacy methods to clean, declarative functions.
- Memory leak prevention and resource cleanup.

---

## ⚙️ Code Example
\`\`\`typescript
async function fetchData<T>(endpoint: string): Promise<T> {
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(\`Request failed: \${res.status}\`);
  return res.json();
}
\`\`\`
`,
      timeline: [
        { time: "00:00", seconds: 0, title: "Architecture & Problem Statement", description: "Overview of the project goals and design patterns." },
        { time: "04:30", seconds: 270, title: "Core Implementation Walkthrough", description: "Step-by-step coding and syntax explanation." },
        { time: "12:15", seconds: 735, title: "Refactoring & Performance Optimization", description: "Optimizing execution speed and cleaning boilerplate." },
        { time: "19:40", seconds: 1180, title: "Testing, Edge Cases & Deployment", description: "Error handling, unit tests, and production build." }
      ],
      mindMap: {
        id: "code-root",
        label: cleanTitle.slice(0, 25),
        description: "Software Architecture",
        children: [
          {
            id: "c-arch",
            label: "Architecture",
            description: "Core setup",
            children: [{ id: "c-mod", label: "Modular Design", description: "Clean code" }]
          },
          {
            id: "c-impl",
            label: "Implementation",
            description: "Code logic",
            children: [{ id: "c-async", label: "Async Control", description: "Promises & async/await" }]
          }
        ]
      },
      quiz: [
        {
          id: "c-q1",
          type: "mcq",
          question: "What is the main benefit of modular software architecture?",
          options: ["Improves code maintainability and testability", "Makes code run 10x faster automatically", "Eliminates all network errors", "Requires zero documentation"],
          answer: "0",
          explanation: "Modular architecture isolates concerns, making code easier to maintain, test, and refactor."
        }
      ],
      flashcards: [
        { id: "c-f1", front: "What is Clean Code?", back: "Code that is readable, simple, direct, and easy to maintain by other engineers.", category: "Architecture", difficulty: "easy" }
      ],
      blog: {
        title: `Deep Dive: ${cleanTitle}`,
        content: `### Overview\nA comprehensive breakdown of software design principles covered in **"${rawTitle}"**.\n\n*Generated by TubeMind AI.*`,
        seoScore: 90,
        keywords: ["Development", "Coding", "Software Architecture"],
        readTime: "4 min read"
      },
      linkedin: {
        professional: `Just synthesized "${cleanTitle}" using TubeMind AI! Great insights on clean architecture and code optimization. 💻✨`,
        funny: `Watching tech tutorials at 2x speed? Let AI generate the notes and code snippets for you instead! 🚀`,
        startup: `Engineering velocity accelerates when team learning is structured and accessible.`,
        developer: `Code extracted and documented cleanly. Dev mode active.`
      },
      twitter: [
        `1/ Synthesized technical notes for "${cleanTitle.slice(0, 40)}..." with TubeMind AI! Here are the key takeaways 🧵`,
        `2/ Clean code Tip: Keep functions small and focused on a single responsibility.`,
        `3/ Try the code snippets and interactive quizzes in the TubeMind AI dashboard!`
      ],
      codeSnippets: [
        {
          id: "c-code-1",
          title: "Async Data Fetcher Pattern",
          language: "typescript",
          code: `export async function executeTask<T>(fn: () => Promise<T>): Promise<{ data?: T; error?: string }> {
  try {
    const data = await fn();
    return { data };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Unknown error' };
  }
}`,
          description: "Clean wrapper pattern for asynchronous error handling."
        }
      ],
      resources: [
        { title: "MDN Web Docs", category: "docs", url: "https://developer.mozilla.org", description: "Official web technology reference." }
      ]
    };
  }

  // General Fallback matched to title
  return {
    id: videoId,
    url,
    title: rawTitle,
    duration: "15:30",
    channel,
    views: "12.8K views",
    publishDate: "Recently Analyzed",
    thumbnail,
    summary: {
      short: `Structured summary and learning guide for "${cleanTitle}".`,
      medium: `This synthesis provides key insights, core arguments, timeline chapters, and interactive study assets for ${cleanTitle}.`,
      detailed: `In this analysis of "${rawTitle}", we synthesize the main themes, key takeaways, structured discussion points, and practical applications presented by ${channel}.`,
      bullets: [
        "Core takeaways and strategic insights from the presentation.",
        "Key concepts structured into easy-to-read chapters.",
        "Interactive recall tools including flashcards and quizzes.",
        "Auto-generated mind map illustrating topic connections."
      ],
      beginner: "A clear summary breaking down the video's main points into actionable study notes.",
      expert: "Comprehensive synthesis mapping core themes, dependencies, and analytical conclusions."
    },
    notes: `# 📝 Study Notes: ${cleanTitle}

**Source Video:** [${rawTitle}](${url})  
**Channel / Presenter:** ${channel}

---

## 🎯 Executive Overview
This presentation delivers essential insights, conceptual frameworks, and practical takeaways.

---

## 🔑 Key Takeaways & Discussion

### 1. Main Theme & Core Arguments
- **Key Insight:** The presentation outlines fundamental principles and practical steps.
- **Structured Approach:** Breaking down complex concepts into actionable phases.

### 2. Practical Applications & Strategy
- Applying these principles in real-world scenarios.
- Avoiding common pitfalls and maximizing effectiveness.

---

## 💡 Summary & Next Steps
- Review the interactive timeline chapters to navigate key sections.
- Test your understanding with the generated Quiz and Flashcard suite.
`,
    timeline: [
      { time: "00:00", seconds: 0, title: "Introduction & Key Themes", description: "Overview of core topics and objectives." },
      { time: "04:15", seconds: 255, title: "Detailed Analysis & Examples", description: "In-depth discussion of key principles." },
      { time: "09:30", seconds: 570, title: "Practical Applications", description: "Real-world strategies and implementation." },
      { time: "13:45", seconds: 825, title: "Summary & Conclusion", description: "Final thoughts and key takeaways." }
    ],
    mindMap: {
      id: "gen-root",
      label: cleanTitle.slice(0, 25),
      description: "Video Summary",
      children: [
        {
          id: "g-themes",
          label: "Core Themes",
          description: "Main concepts",
          children: [{ id: "g-intro", label: "Introduction", description: "Overview" }]
        },
        {
          id: "g-actions",
          label: "Takeaways",
          description: "Action items",
          children: [{ id: "g-quiz", label: "Review Quiz", description: "Assess knowledge" }]
        }
      ]
    },
    quiz: [
      {
        id: "g-q1",
        type: "mcq",
        question: `What is the primary topic discussed in "${cleanTitle.slice(0, 35)}..."?`,
        options: ["Core principles and practical applications", "Unrelated historical events", "Hardware manufacturing steps", "None of the above"],
        answer: "0",
        explanation: "The presentation focuses on core principles and practical methodologies for the subject topic."
      }
    ],
    flashcards: [
      { id: "g-f1", front: `What is the key takeaway of "${cleanTitle.slice(0, 30)}"?`, back: "Combining conceptual understanding with active recall and practice.", category: "Core Concept", difficulty: "easy" }
    ],
    blog: {
      title: `Key Takeaways from ${cleanTitle}`,
      content: `### Overview\nA structured breakdown of the insights from **"${rawTitle}"**.\n\n*Generated by TubeMind AI.*`,
      seoScore: 88,
      keywords: ["Study Notes", "AI Summary", "Learning Guide"],
      readTime: "3 min read"
    },
    linkedin: {
      professional: `Just synthesized "${cleanTitle}" using TubeMind AI! Turned the lecture into interactive notes, mind maps, and flashcards. 🚀`,
      funny: `Why rewatch long videos when AI can generate your study notes and quizzes in seconds? 💡`,
      startup: `TubeMind AI transforms video viewing into active learning.`,
      developer: `Video processing complete. Interactive notes and flashcards generated.`
    },
    twitter: [
      `1/ Synthesized study notes for "${cleanTitle.slice(0, 40)}..." with TubeMind AI! 🧵`,
      `2/ Check out the interactive quiz and flashcards in the dashboard!`
    ],
    codeSnippets: [
      {
        id: "g-code-1",
        title: "Study Automation Helper",
        language: "javascript",
        code: `// TubeMind AI Study Helper
console.log("Synthesized analysis for: ${cleanTitle}");`,
        description: "Execution helper script for study notes."
      }
    ],
    resources: [
      { title: "TubeMind AI Documentation", category: "docs", url: "https://tubemind.ai/docs", description: "Learn how to use active learning tools." }
    ]
  };
}
