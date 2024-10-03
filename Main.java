import java.io.*;
import java.util.*;

public class Main {
    private static final FastIO sc = new FastIO();

    public static void main(String[] args) {
        int t = sc.nextInt();
        while (t-- > 0) {
            solve();
        }
    }

    static void solve() {
       long a=0L;
       long b=sc.nextLong();
       long c=sc.nextLong();
       long d=sc.nextLong();
       for(int i=62;i>=0;i--)
       {
            long x=(b>>i)%2;
            long y=(c>>i)%2;
            long z=(d>>i)%2;
            if(z==1L)
            {
                if(y==1L)
                {
                    if(x==0L)
                    {
                System.out.println("-1");
                return;
                    }
                
                }
                else
                a+=(1L<<i);

            }
            else
            {
                   if(y==0L)
                   {
                    if(x==1L)
                    {
                        System.out.println("-1");
                        return;
                            }
                   }
                   else
                   a+=(1L<<i);
            }
           
       }
       System.out.println(a);
    }
    static long fun(long n)
    {
          long s=1L,e=5*(long)Math.pow(10,9),m=0L,ans=0L;
          while(s<=e)
          {
            m=s+(e-s)/2;
            if(m*m<=n)
            {
                ans=m;
                s=m+1;
            }
            else
            e=m-1;
          }
          return ans;
    }
    static int bfs(int idx,int a[],boolean vi[],ArrayList<ArrayList<Integer>> adj)
    {
        if(vi[idx])
        return 0;
        vi[idx]=true;
        for(int ele:adj.get(idx))
        {
            if(vi[ele])
            continue;
            a[idx]+=bfs(ele,a,vi,adj);
        }
        return a[idx];
    }
    static long ceil(long a,long b)
    {
        if(a%b==0)
        return a/b;

        return a/b+1;
    }
    static class Pair
    {
        int x;
        int y;
        Pair(int x,int y)
        {
            this.x=x;
            this.y=y;
        }
    }
}

class FastIO extends PrintWriter {
    private BufferedReader br;
    private StringTokenizer st;

    public FastIO() {
        this(System.in, System.out);
    }

    public FastIO(InputStream in, OutputStream out) {
        super(out);
        br = new BufferedReader(new InputStreamReader(in));
    }

    public FastIO(String input, String output) throws FileNotFoundException {
        super(output);
        br = new BufferedReader(new FileReader(input));
    }

    public String next() {
        try {
            while (st == null || !st.hasMoreTokens()) {
                st = new StringTokenizer(br.readLine());
            }
            return st.nextToken();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public int nextInt() {
        return Integer.parseInt(next());
    }

    public double nextDouble() {
        return Double.parseDouble(next());
    }

    public long nextLong() {
        return Long.parseLong(next());
    }
}
