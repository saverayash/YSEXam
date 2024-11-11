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
       long n=sc.nextLong();
       long b=sc.nextLong();
       long c=sc.nextLong();
       if(b==0L)
       {
            if(n<=c+1L)
            {
                if(n==c+1L)
                System.out.println(n-1L);
                else
            System.out.println(n);
            }
            else if(c+2L==n)
            System.out.println(n-1L);
            else
            System.out.println("-1");
            return;
       }
      /*  if((n-c-1)%b==0L)
       System.out.println(Math.min(n,(n-(n-c-1)/b)-1L));
       else
       System.out.println(Math.min(n,(n-(n-c-1)/b)));*/
       if(n-c-1L<0L)
       System.out.println(n);
       else
       System.out.println(n-1-(n-c-1)/b);
    }
    static long cnt(long n)
    {
        if(n<=1)
        return n;
        
        if(n%2==1)
        return 1+cnt(n/2);

        return cnt(n/2);
    }
    static boolean check(long a[],long m,int n)
    {
        int i=0;
        boolean bol=false;
        for(i=0;i<n;i+=2)
        {
            if(i+1<n && a[i+1]-a[i]<=m)
            {
                continue;
            }
            else if(i+1<n)
            {
                if(bol)
                return false;
                bol=true;
                i--;
            }
        }
        return true;
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

    public long nextLong() {
        return Long.parseLong(next());
    }
}
